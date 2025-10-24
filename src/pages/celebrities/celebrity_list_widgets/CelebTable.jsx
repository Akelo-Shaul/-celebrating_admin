import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, User, MessageCircle, Bell, Ban, CheckCircle, Award, BarChart3, Trash2, Edit, XCircle } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../../dashboard/shop_widgets/countryUtils'
import { useMessaging } from '../../../contexts/MessagingContext'
import { useNotification } from '../../../contexts/NotificationContext'

// Context Menu Component
const CelebrityContextMenu = ({ isOpen, position, onClose, celebrity, onAction }) => {
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
    { icon: User, label: 'View Profile', action: 'viewProfile', color: 'text-blue-600' },
    { icon: MessageCircle, label: 'Message Celebrity', action: 'message', color: 'text-purple-600' },
    { icon: Bell, label: 'Send Notification', action: 'notify', color: 'text-indigo-600' },
    { icon: BarChart3, label: 'View Analytics', action: 'analytics', color: 'text-green-600' },
    { icon: Edit, label: 'Edit Profile', action: 'edit', color: 'text-blue-600' },
    { icon: Award, label: 'Remove Verification', action: 'removeVerify', color: 'text-orange-600' },
    { icon: Ban, label: celebrity.status === 'disabled' ? 'Enable Account' : 'Disable Account', action: celebrity.status === 'disabled' ? 'enable' : 'disable', color: celebrity.status === 'disabled' ? 'text-green-600' : 'text-yellow-600' },
    { icon: XCircle, label: 'Ban User', action: 'ban', color: 'text-red-600' },
    { icon: Trash2, label: 'Delete Account', action: 'delete', color: 'text-red-700' }
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

export default function CelebTable({ celebs }) {
  const navigate = useNavigate()
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, celebrity: null })
  
  const rows = celebs && celebs.length ? celebs : Array.from({ length: 6 }).map((_, i) => ({
    handle: 'Shaul',
    name: i % 2 === 0 ? 'Shaul Akelo' : 'Hankue Hue',
    id: 'I9U0JHF92H90H8230',
    followers: 32000,
    posts: 32,
    rating: 4.3,
    country: 'Kenya',
    trendType: i % 3 === 0 ? 'down' : 'up',
    email: 'braum.h@gmail.com',
    status: 'active'
  }))

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
      case 'viewProfile':
        navigate(`/profile/${encodeURIComponent(celebrity.handle)}`, { state: { role: 'celebrity' } })
        break
      case 'message':
        openMessage({ name: celebrity.name, username: `@${celebrity.handle}`, email: celebrity.email })
        break
      case 'notify':
        openNotification({ name: celebrity.name, username: `@${celebrity.handle}`, email: celebrity.email })
        break
      case 'analytics':
        console.log(`Viewing analytics for: ${celebrity.name}`)
        alert(`Opening analytics for ${celebrity.name}`)
        break
      case 'edit':
        console.log(`Editing profile: ${celebrity.name}`)
        alert(`Opening edit dialog for ${celebrity.name}`)
        break
      case 'removeVerify':
        console.log(`Removing verification from: ${celebrity.name}`)
        if (confirm(`Remove verification from ${celebrity.name}?`)) {
          alert(`Verification removed from ${celebrity.name}`)
        }
        break
      case 'disable':
        console.log(`Disabling account: ${celebrity.name}`)
        if (confirm(`Disable account for ${celebrity.name}?`)) {
          alert(`Account disabled for ${celebrity.name}`)
        }
        break
      case 'enable':
        console.log(`Enabling account: ${celebrity.name}`)
        alert(`Account enabled for ${celebrity.name}`)
        break
      case 'ban':
        console.log(`Banning user: ${celebrity.name}`)
        if (confirm(`Are you sure you want to ban ${celebrity.name}? This is a serious action.`)) {
          alert(`User ${celebrity.name} has been banned`)
        }
        break
      case 'delete':
        console.log(`Deleting account: ${celebrity.name}`)
        if (confirm(`Are you sure you want to delete ${celebrity.name}'s account? This action cannot be undone.`)) {
          alert(`Account deleted for ${celebrity.name}`)
        }
        break
      default:
        break
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Followers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Trend</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((r, i) => (
              <tr 
                key={i} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/profile/${encodeURIComponent(r.handle)}`, { state: { role: 'celebrity' } })}
                onContextMenu={(e) => handleContextMenu(e, r)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {/* Circular avatar with colored border - orange for celebrities */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-orange-500 bg-gray-100 text-gray-700 font-semibold"
                    >
                      {r.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">@{r.handle}</div>
                      <div className="text-sm text-gray-500">{r.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{r.name}</div>
                  <div className="text-sm text-gray-500">{r.posts} posts</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.followers.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Content Creator
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    {(() => {
                      const Flag = Flags[countryToCode(r.country)];
                      return Flag ? <Flag className="w-6 h-4" /> : null;
                    })()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  <div className="flex items-center justify-center">
                    {r.trendType === 'up' ? (
                      <TrendingUp size={18} className="text-green-600" />
                    ) : (
                      <TrendingDown size={18} className="text-red-600" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.email}
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
            <span className="text-sm text-gray-700">Celebrities</span>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      <CelebrityContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        celebrity={contextMenu.celebrity}
        onAction={handleAction}
      />
    </div>
  )
}
