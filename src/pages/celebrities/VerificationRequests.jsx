import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, User, MessageCircle, Bell, CheckCircle, XCircle, Award, BarChart3, Edit } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../dashboard/shop_widgets/countryUtils'
import { useMessaging } from '../../contexts/MessagingContext'
import { useNotification } from '../../contexts/NotificationContext'

// Context Menu Component for Verification Requests
const VerificationContextMenu = ({ isOpen, position, onClose, celebrity, onAction }) => {
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

  if (!isOpen || !celebrity) return null

  const menuItems = [
    { icon: CheckCircle, label: 'Approve Request', action: 'approve', color: 'text-green-600' },
    { icon: XCircle, label: 'Reject Request', action: 'reject', color: 'text-red-600' },
    { icon: User, label: 'View Profile', action: 'viewProfile', color: 'text-blue-600' },
    { icon: MessageCircle, label: 'Message User', action: 'message', color: 'text-purple-600' },
    { icon: Bell, label: 'Send Notification', action: 'notify', color: 'text-indigo-600' },
    { icon: BarChart3, label: 'View Analytics', action: 'analytics', color: 'text-green-600' },
    { icon: Edit, label: 'Request More Info', action: 'requestInfo', color: 'text-orange-600' }
  ]

  return (
    <div 
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[220px]"
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, celebrity)
            onClose()
          }}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 transition-colors"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

const VerificationRequests = () => {
  const navigate = useNavigate()
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, celebrity: null })
  const columns = [
    { header: 'Profile', key: 'profile' },
    { header: 'Followers', key: 'followers' },
    { header: 'Following', key: 'following' },
    { header: 'Connections', key: 'connections' },
    { header: 'Category', key: 'category' },
    { header: 'Rating', key: 'rating' },
    { header: 'Country', key: 'country' },
    { header: 'Trend', key: 'trend' },
    { header: 'email', key: 'email' },
    { header: '', key: 'actions' }
  ];

  const mockData = [
    {
      id: '1',
      profile: {
        name: 'Shaul Akelo',
        username: '@Shaul',
        handle: 'Shaul',
        uniqueId: 'I9U0JHF92H90H8230',
        posts: 32,
        avatar: '/celebratinglogo.png'
      },
      followers: '32,000',
      following: '32,000',
      connections: '32,000',
      category: 'Artist',
      rating: '4.5',
      country: 'Kenya',
      trendType: 'up',
      email: 'braum.h@gmail.com',
      type: 'celebrity'
    },
    {
      id: '2',
      profile: {
        name: 'Hankue Hue',
        username: '@Hankue',
        handle: 'Hankue',
        uniqueId: 'H8Y7T6R5E4W3Q2A1',
        posts: 45,
        avatar: '/celebratinglogo.png'
      },
      followers: '45,000',
      following: '12,000',
      connections: '28,000',
      category: 'Musician',
      rating: '4.8',
      country: 'Nigeria',
      trendType: 'up',
      email: 'hankue@gmail.com',
      type: 'celebrity'
    },
    {
      id: '3',
      profile: {
        name: 'Mary Jane',
        username: '@MaryJ',
        handle: 'MaryJ',
        uniqueId: 'M9N8B7V6C5X4Z3A2',
        posts: 28,
        avatar: '/celebratinglogo.png'
      },
      followers: '18,000',
      following: '8,000',
      connections: '15,000',
      category: 'Content Creator',
      rating: '4.2',
      country: 'Ghana',
      trendType: 'down',
      email: 'mary.j@gmail.com',
      type: 'celebrity'
    },
    {
      id: '4',
      profile: {
        name: 'David Mwangi',
        username: '@DavidM',
        handle: 'DavidM',
        uniqueId: 'D5M4W3A2N1G0I9H8',
        posts: 67,
        avatar: '/celebratinglogo.png'
      },
      followers: '89,000',
      following: '15,000',
      connections: '42,000',
      category: 'Athlete',
      rating: '4.7',
      country: 'Tanzania',
      trendType: 'up',
      email: 'david.m@gmail.com',
      type: 'celebrity'
    },
    {
      id: '5',
      profile: {
        name: 'Amara Okafor',
        username: '@AmaraO',
        handle: 'AmaraO',
        uniqueId: 'A7O6K5A4F3O2R1',
        posts: 53,
        avatar: '/celebratinglogo.png'
      },
      followers: '56,000',
      following: '9,000',
      connections: '31,000',
      category: 'Fashion Designer',
      rating: '4.6',
      country: 'Uganda',
      trendType: 'up',
      email: 'amara.o@gmail.com',
      type: 'celebrity'
    }
  ];

  const handleContextMenu = (e, celebrity) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      celebrity
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, celebrity: null })
  }

  const handleAction = (action, celebrity) => {
    switch (action) {
      case 'approve':
        console.log(`Approving verification request for: ${celebrity.profile.name}`)
        if (confirm(`Approve verification request for ${celebrity.profile.name}?`)) {
          alert(`Verification approved for ${celebrity.profile.name}`)
        }
        break
      case 'reject':
        console.log(`Rejecting verification request for: ${celebrity.profile.name}`)
        if (confirm(`Reject verification request for ${celebrity.profile.name}?`)) {
          alert(`Verification request rejected for ${celebrity.profile.name}`)
        }
        break
      case 'viewProfile':
        navigate(`/profile/${encodeURIComponent(celebrity.profile.handle)}`, { state: { role: 'celebrity' } })
        break
      case 'message':
        openMessage({ name: celebrity.profile.name, username: celebrity.profile.username, email: celebrity.email })
        break
      case 'notify':
        openNotification({ name: celebrity.profile.name, username: celebrity.profile.username, email: celebrity.email })
        break
      case 'analytics':
        console.log(`Viewing analytics for: ${celebrity.profile.name}`)
        alert(`Opening analytics for ${celebrity.profile.name}`)
        break
      case 'requestInfo':
        console.log(`Requesting more info from: ${celebrity.profile.name}`)
        alert(`Requesting additional information from ${celebrity.profile.name}`)
        break
      default:
        break
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Verification Requests</h1>
        <p className="text-gray-600 mt-1">Review and process celebrity verification applications</p>
      </div>
      {/* Header with Search and Filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Celebrity Verification Requests</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Celebrities..."
                  className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
                />
                <svg
                  className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockData.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 border-b cursor-context-menu"
                onContextMenu={(e) => handleContextMenu(e, row)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {/* Circular avatar with orange border for celebrities */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-orange-500 bg-gray-100 text-gray-700 font-semibold cursor-pointer"
                      onClick={() => navigate(`/profile/${encodeURIComponent(row.profile.handle)}`, { state: { role: 'celebrity' } })}
                    >
                      {row.profile.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(row.profile.handle)}`, { state: { role: 'celebrity' } })}>
                      <div className="text-sm font-medium text-gray-900">{row.profile.username}</div>
                      <div className="text-sm text-gray-500">{row.profile.uniqueId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.followers}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.following}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.connections}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    {(() => {
                      const Flag = Flags[countryToCode(row.country)];
                      return Flag ? <Flag className="w-6 h-4" /> : null;
                    })()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  <div className="flex items-center justify-center">
                    {row.trendType === 'up' ? (
                      <TrendingUp size={18} className="text-green-600" />
                    ) : (
                      <TrendingDown size={18} className="text-red-600" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="inline-flex items-center px-4 py-1.5 bg-yellow-300 text-black text-sm font-medium rounded-md hover:bg-yellow-400 focus:outline-none">
                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Legend/Indicator */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-700">Celebrity Verification Requests</span>
            </div>
          </div>
        </div>

        {/* Context Menu */}
        <VerificationContextMenu
          isOpen={contextMenu.isOpen}
          position={contextMenu.position}
          onClose={closeContextMenu}
          celebrity={contextMenu.celebrity}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default VerificationRequests;