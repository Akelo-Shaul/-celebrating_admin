import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Edit, Search, SlidersHorizontal, UserCog, Ban, CheckCircle, Bell, EyeOff, Eye, ThumbsUp, MessageSquare, AlertTriangle, TrendingUp, FileText, Trash2, Mail } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'
import { useMessaging } from '../../contexts/MessagingContext'
import { useNotification } from '../../contexts/NotificationContext'

// Context Menu Component for Users
const UserContextMenu = ({ isOpen, position, onClose, user, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !user) return null

  const isRestricted = user.status === 'Inactive' || user.status === 'Restricted'
  
  const menuItems = [
    ...(!isRestricted ? [{
      icon: Ban,
      label: 'Disable Account',
      action: 'disable',
      color: 'text-red-600'
    }] : [{
      icon: CheckCircle,
      label: 'Activate Account',
      action: 'activate',
      color: 'text-green-600'
    }]),
    {
      icon: Bell,
      label: 'Send Notification',
      action: 'notify',
      color: 'text-purple-600'
    },
    {
      icon: EyeOff,
      label: 'Hide/Disable',
      action: 'hideUser',
      color: 'text-orange-600'
    },
    {
      icon: Mail,
      label: 'Message User',
      action: 'messageUser',
      color: 'text-blue-500'
    },
    {
      icon: Trash2,
      label: 'Delete',
      action: 'deleteUser',
      color: 'text-red-600'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-500">{user.type || 'User'}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, user)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// Comment Context Menu Component
const CommentContextMenu = ({ isOpen, position, onClose, comment, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !comment) return null

  const isHidden = comment.status === 'hidden'
  const isPending = comment.status === 'pending'
  const isSpam = comment.status === 'spam'
  
  const menuItems = [
    ...(!isHidden ? [{
      icon: EyeOff,
      label: 'Hide Comment',
      action: 'hide',
      color: 'text-orange-600'
    }] : [{
      icon: Eye,
      label: 'Unhide Comment',
      action: 'unhide',
      color: 'text-green-600'
    }]),
    ...(isPending ? [{
      icon: ThumbsUp,
      label: 'Approve Comment',
      action: 'approve',
      color: 'text-green-600'
    }] : []),
    {
      icon: Edit,
      label: 'Edit Comment',
      action: 'edit',
      color: 'text-blue-600'
    },
    ...(!isSpam ? [{
      icon: AlertTriangle,
      label: 'Mark as Spam',
      action: 'spam',
      color: 'text-red-600'
    }] : []),
    {
      icon: TrendingUp,
      label: 'Change Sentiment',
      action: 'sentiment',
      color: 'text-purple-600'
    },
    {
      icon: MessageSquare,
      label: 'Send Warning',
      action: 'warning',
      color: 'text-yellow-600'
    },
    {
      icon: FileText,
      label: 'View Data',
      action: 'viewData',
      color: 'text-gray-700'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900 line-clamp-1">{comment.comment}</div>
        <div className="text-xs text-gray-500">
          {comment.status === 'hidden' && 'Hidden • '}
          {comment.status === 'pending' && 'Pending • '}
          {comment.status === 'spam' && 'Spam • '}
          Sentiment: {comment.sentimentAnalysis}
        </div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, comment)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()
  const [activeTab, setActiveTab] = useState('Comments')
  const [userContextMenu, setUserContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, user: null })
  const [commentContextMenu, setCommentContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, comment: null })

  // Mock data for the post
  const postData = {
    title: 'A Rocky Day',
    status: 'Published',
    author: {
      name: 'Braum Halaberry',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    caption: 'A revolution to the world of music, founder of Carp Co',
    postedOn: '28-02-2000',
    lastUpdated: '28-02-2000',
    rating: 3,
    categories: ['Music', 'Art'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    stats: {
      salutes: 12087,
      comments: 12087,
      reshares: 12,
      views: 200,
      walletBalance: 12087
    },
    gifts: [
      { id: 1, name: 'Cake', from: 'Braum Halaberry', amount: 100, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 2, name: 'Cake', from: 'Braum Halaberry', amount: 100, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 3, name: 'Cake', from: 'Braum Halaberry', amount: 100, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 4, name: 'Cake', from: 'Braum Halaberry', amount: 100, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }
    ],
    comments: [
      {
        id: 1,
        user: { 
          avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
          name: '@Shaul',
          userId: 'i9U0JiF92H90H8230',
          type: 'Member',
          status: 'Active'
        },
        comment: "Can't believe this is how it is supposed to be and how about we just do it ...",
        post: 50,
        salutes: 50,
        sentimentAnalysis: 3.5,
        status: 'active'
      },
      {
        id: 2,
        user: { 
          avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
          name: '@Shaul',
          userId: 'i9U0JiF92H90H8230',
          type: 'Member',
          status: 'Active'
        },
        comment: "Can't believe this is how it is supposed to be and how about we just do it ...",
        post: 50,
        salutes: 50,
        sentimentAnalysis: 3.5,
        status: 'pending'
      },
      {
        id: 3,
        user: { 
          avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
          name: '@Shaul',
          userId: 'i9U0JiF92H90H8230',
          type: 'Celebrity',
          status: 'Active'
        },
        comment: "Can't believe this is how it is supposed to be and how about we just do it ...",
        post: 50,
        salutes: 50,
        sentimentAnalysis: 3.5,
        status: 'active'
      },
      {
        id: 4,
        user: { 
          avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
          name: '@Shaul',
          userId: 'i9U0JiF92H90H8230',
          type: 'Member',
          status: 'Active'
        },
        comment: "Can't believe this is how it is supposed to be and how about we just do it ...",
        post: 50,
        salutes: 50,
        sentimentAnalysis: 3.5,
        status: 'hidden'
      },
      {
        id: 5,
        user: { 
          avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
          name: '@Shaul',
          userId: 'i9U0JiF92H90H8230',
          type: 'Celebrity',
          status: 'Active'
        },
        comment: "Can't believe this is how it is supposed to be and how about we just do it ...",
        post: 50,
        salutes: 50,
        sentimentAnalysis: 3.5,
        status: 'active'
      }
    ],
    salutes: [
      {
        id: 1,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        followers: 32000,
        rating: 4.5,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Celebrity',
        status: 'Active'
      },
      {
        id: 2,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
        followers: 23000,
        rating: 3.2,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Member',
        status: 'Active'
      },
      {
        id: 3,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
        followers: 23000,
        rating: 4.7,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Celebrity',
        status: 'Active'
      },
      {
        id: 4,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
        followers: 23000,
        rating: 3.6,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Member',
        status: 'Active'
      },
      {
        id: 5,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
        followers: 23000,
        rating: 3.5,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Celebrity',
        status: 'Active'
      },
      {
        id: 6,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
        followers: 23000,
        rating: 4.8,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Member',
        status: 'Active'
      }
    ],
    reshares: [
      {
        id: 1,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
        followers: 32000,
        rating: 4.5,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Celebrity',
        status: 'Active'
      },
      {
        id: 2,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        followers: 23000,
        rating: 3.2,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Member',
        status: 'Active'
      },
      {
        id: 3,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        followers: 23000,
        rating: 4.7,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Celebrity',
        status: 'Active'
      },
      {
        id: 4,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
        followers: 23000,
        rating: 3.6,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Member',
        status: 'Active'
      },
      {
        id: 5,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        followers: 23000,
        rating: 3.5,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Celebrity',
        status: 'Active'
      },
      {
        id: 6,
        name: '@Shaul',
        user: '@Shaul',
        userId: 'i9U0JiF92H90H8230',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        followers: 23000,
        rating: 4.8,
        country: 'KE',
        timestamp: '28-02-2000',
        type: 'Member',
        status: 'Active'
      }
    ]
  }

  const tabs = ['Comments', 'Salutes', 'Reshares']

  // Context menu handlers
  const handleUserContextMenu = (e, user) => {
    e.preventDefault()
    setUserContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      user
    })
  }

  const closeUserContextMenu = () => {
    setUserContextMenu({ isOpen: false, position: { x: 0, y: 0 }, user: null })
  }

  const handleUserAction = (action, user) => {
    switch (action) {
      case 'messageUser':
        openMessage(user)
        break
      case 'notify':
        openNotification(user)
        break
      case 'disable':
        console.log(`Disabling account: ${user.name}`)
        alert(`Disabled account for ${user.name}`)
        break
      case 'activate':
        console.log(`Activating account: ${user.name}`)
        alert(`Activated account for ${user.name}`)
        break
      case 'hideUser':
        console.log(`Hiding/Disabling user: ${user.name}`)
        alert(`Hidden/Disabled user: ${user.name}`)
        break
      case 'deleteUser':
        console.log(`Deleting user: ${user.name}`)
        if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
          alert(`Deleted user: ${user.name}`)
        }
        break
      default:
        break
    }
  }

  const handleCommentContextMenu = (e, comment) => {
    e.preventDefault()
    setCommentContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      comment
    })
  }

  const closeCommentContextMenu = () => {
    setCommentContextMenu({ isOpen: false, position: { x: 0, y: 0 }, comment: null })
  }

  const handleCommentAction = (action, comment) => {
    switch (action) {
      case 'hide':
        console.log(`Hiding comment: ${comment.id}`)
        alert(`Hidden comment: "${comment.comment.substring(0, 30)}..."`)
        break
      case 'unhide':
        console.log(`Unhiding comment: ${comment.id}`)
        alert(`Unhidden comment: "${comment.comment.substring(0, 30)}..."`)
        break
      case 'approve':
        console.log(`Approving comment: ${comment.id}`)
        alert(`Approved comment: "${comment.comment.substring(0, 30)}..."`)
        break
      case 'edit':
        console.log(`Editing comment: ${comment.id}`)
        alert(`Opening edit dialog for comment: "${comment.comment.substring(0, 30)}..."`)
        break
      case 'spam':
        console.log(`Marking as spam: ${comment.id}`)
        alert(`Marked comment as spam: "${comment.comment.substring(0, 30)}..."`)
        break
      case 'sentiment':
        console.log(`Changing sentiment for comment: ${comment.id}`)
        alert(`Opening sentiment selector for comment (current: ${comment.sentimentAnalysis})`)
        break
      case 'warning':
        console.log(`Sending warning for comment: ${comment.id}`)
        alert(`Sending warning to user about comment: "${comment.comment.substring(0, 30)}..."`)
        break
      case 'viewData':
        console.log(`Viewing data for comment: ${comment.id}`)
        alert(`Viewing detailed data for comment ID: ${comment.id}`)
        break
      default:
        break
    }
  }

  return (
    <div className="p-3 md:p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="col-span-1 lg:col-span-8">
          <div className="rounded-lg p-2 md:p-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-6">
              {/* Post Image */}
              <div className="col-span-1 md:col-span-5">
                <img
                  src={postData.image}
                  alt={postData.title}
                  className="w-full h-60 md:h-80 object-cover rounded-lg"
                />
              </div>

              {/* Post Details */}
              <div className="col-span-1 md:col-span-7">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold">{postData.title}</h1>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="bg-[#F19534] text-white px-3 md:px-4 py-1 rounded-md font-semibold text-sm md:text-base">
                      {postData.status}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Author */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">By</div>
                  <div className="flex items-center gap-3">
                    <img 
                      src={postData.author.avatar} 
                      alt={postData.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold text-lg">{postData.author.name}</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Caption</div>
                  <div className="text-gray-800">{postData.caption}</div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div>
                    <div className="text-xs md:text-sm text-gray-600 mb-1">Posted On</div>
                    <div className="font-semibold text-sm md:text-base">{postData.postedOn}</div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-600 mb-1">Last Updated</div>
                    <div className="font-semibold text-sm md:text-base">{postData.lastUpdated}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 justify-center md:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-8 h-8 ${star <= postData.rating ? 'text-orange-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Categories */}
                <div className="flex gap-2 justify-center md:justify-start">
                  {postData.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-[#F19534] text-white px-4 py-1 rounded-md font-semibold"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 border-t border-b border-gray-200 py-4">
              <div className="text-center md:text-left">
                <div className="text-xs md:text-sm text-gray-600 mb-1">Salutes</div>
                <div className="text-xl md:text-3xl font-bold">{postData.stats.salutes.toLocaleString()}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs md:text-sm text-gray-600 mb-1">Comments</div>
                <div className="text-xl md:text-3xl font-bold">{postData.stats.comments.toLocaleString()}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs md:text-sm text-gray-600 mb-1">Reshares</div>
                <div className="text-xl md:text-3xl font-bold">{postData.stats.reshares}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs md:text-sm text-gray-600 mb-1">Views</div>
                <div className="text-xl md:text-3xl font-bold">{postData.stats.views}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar - Gifts */}
        <div className="col-span-1 lg:col-span-4">
          <div className="bg-gray-200 rounded-lg p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Gifts</h2>
            <div className="space-y-2 md:space-y-3">
              {postData.gifts.map((gift) => (
                <div key={gift.id} className="bg-gray-300 rounded-lg p-2 md:p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div>
                      <div className="font-semibold text-sm md:text-base">{gift.name}</div>
                      <div className="text-xs text-gray-600">from</div>
                      <div className="flex items-center gap-1 md:gap-2 mt-1">
                        <img
                          src={gift.avatar}
                          alt={gift.from}
                          className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                        />
                        <span className="text-xs md:text-sm font-medium truncate max-w-[120px]">{gift.from}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-green-600">${gift.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg p-3 md:p-6">
        {/* Tabs */}
        <div className="mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-3">
            <div className="flex gap-0 border-b border-gray-300 overflow-x-auto">
                {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 md:px-6 py-2 md:py-3 font-semibold relative whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                >
                    {tab}
                    {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 md:flex-initial">
                <input
                    type="text"
                    placeholder={`Search ${activeTab === 'Comments' ? 'Comment' : 'Users'}...`}
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold">
                <SlidersHorizontal className="w-5 h-5" />
                Filter
                </button>
                <button className="md:hidden p-2 bg-gray-100 rounded-lg">
                <SlidersHorizontal className="w-5 h-5" />
                </button>
            </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'Comments' && (
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-300">
                    <tr>
                    <th className="px-6 py-4 text-left font-semibold min-w-[400px]">Comment</th>
                    <th className="px-6 py-4 text-left font-semibold min-w-[250px]">User</th>
                    <th className="px-6 py-4 text-center font-semibold min-w-[120px]">Salutes</th>
                    <th className="px-6 py-4 text-center font-semibold min-w-[180px]">Sentiment Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    {postData.comments.map((comment) => (
                    <tr
                      key={comment.id}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                      onContextMenu={(e) => handleCommentContextMenu(e, comment)}
                    >
                        <td className="px-6 py-5 min-w-[400px]">
                        <div className="text-sm text-gray-700 leading-relaxed">{comment.comment}</div>
                        </td>
                        <td
                          className="px-6 py-5"
                          onClick={() => navigate(`/profile/${encodeURIComponent(comment.user.name)}`)}
                        >
                        <div className="flex items-center gap-4">
                            <img
                            src={comment.user.avatar}
                            alt="User"
                            className="w-12 h-12 rounded-full flex-shrink-0"
                            />
                            <div className="min-w-0">
                            <div className="font-semibold text-base mb-1">{comment.user.name || '@User'}</div>
                            <div className="text-sm text-gray-600">{comment.user.userId || 'ID'}</div>
                            </div>
                        </div>
                        </td>
                        <td className="px-6 py-5 font-semibold text-center text-base">{comment.salutes}</td>
                        <td className="px-6 py-5 font-semibold text-center text-base">{comment.sentimentAnalysis}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}

            {activeTab === 'Salutes' && (
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-300">
                    <tr>
                    <th className="px-6 py-4 text-left font-semibold">User</th>
                    <th className="px-6 py-4 text-center font-semibold">Followers</th>
                    <th className="px-6 py-4 text-center font-semibold">Rating</th>
                    <th className="px-6 py-4 text-center font-semibold">Country</th>
                    <th className="px-6 py-4 text-center font-semibold">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {postData.salutes.map((salute) => (
                    <tr
                      key={salute.id}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/profile/${encodeURIComponent(salute.name)}`)}
                      onContextMenu={(e) => handleUserContextMenu(e, salute)}
                    >
                        <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                            <img
                            src={salute.avatar}
                            alt="User"
                            className="w-12 h-12 rounded-full flex-shrink-0"
                            />
                            <div className="min-w-0">
                            <div className="font-semibold text-base mb-1">{salute.user}</div>
                            <div className="text-sm text-gray-600">{salute.userId}</div>
                            </div>
                        </div>
                        </td>
                        <td className="px-6 py-5 font-semibold text-center text-base">{salute.followers.toLocaleString()}</td>
                        <td className="px-6 py-5 font-semibold text-center text-base">{salute.rating}</td>
                        <td className="px-6 py-5 text-center">
                        {React.createElement(Flags[salute.country], { className: 'w-8 h-5' })}
                        </td>
                        <td className="px-6 py-5 text-center text-sm">{salute.timestamp}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}

            {activeTab === 'Reshares' && (
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-300">
                    <tr>
                    <th className="px-6 py-4 text-left font-semibold">User</th>
                    <th className="px-6 py-4 text-center font-semibold">Followers</th>
                    <th className="px-6 py-4 text-center font-semibold">Rating</th>
                    <th className="px-6 py-4 text-center font-semibold">Country</th>
                    <th className="px-6 py-4 text-center font-semibold">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {postData.reshares.map((reshare) => (
                    <tr
                      key={reshare.id}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/profile/${encodeURIComponent(reshare.name)}`)}
                      onContextMenu={(e) => handleUserContextMenu(e, reshare)}
                    >
                        <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                            <img
                            src={reshare.avatar}
                            alt="User"
                            className="w-12 h-12 rounded-full flex-shrink-0"
                            />
                            <div className="min-w-0">
                            <div className="font-semibold text-base mb-1">{reshare.user}</div>
                            <div className="text-sm text-gray-600">{reshare.userId}</div>
                            </div>
                        </div>
                        </td>
                        <td className="px-6 py-5 font-semibold text-center text-base">{reshare.followers.toLocaleString()}</td>
                        <td className="px-6 py-5 font-semibold text-center text-base">{reshare.rating}</td>
                        <td className="px-6 py-5 text-center">
                        {React.createElement(Flags[reshare.country], { className: 'w-8 h-5' })}
                        </td>
                        <td className="px-6 py-5 text-center text-sm">{reshare.timestamp}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
      </div>

      {/* Context Menus */}
      <UserContextMenu
        isOpen={userContextMenu.isOpen}
        position={userContextMenu.position}
        onClose={closeUserContextMenu}
        user={userContextMenu.user}
        onAction={handleUserAction}
      />

      <CommentContextMenu
        isOpen={commentContextMenu.isOpen}
        position={commentContextMenu.position}
        onClose={closeCommentContextMenu}
        comment={commentContextMenu.comment}
        onAction={handleCommentAction}
      />
    </div>
  )
}

export default PostDetail

