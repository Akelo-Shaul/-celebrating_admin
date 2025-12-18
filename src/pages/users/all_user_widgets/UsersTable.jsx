import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, UserCog, Ban, Edit, CheckCircle, Bell, MessageCircle } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../../dashboard/shop_widgets/countryUtils'
import { useMessaging } from '../../../contexts/MessagingContext'
import { useNotification } from '../../../contexts/NotificationContext'

// Context Menu Component
const ContextMenu = ({ isOpen, position, onClose, user, onAction }) => {
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
    {
      icon: MessageCircle,
      label: 'Message User',
      action: 'message',
      color: 'text-blue-600'
    },
    {
      icon: UserCog,
      label: user.type === 'celebrity' ? 'Change to Member' : 'Change to Celebrity',
      action: 'changeRole',
      color: 'text-blue-600'
    },
    {
      icon: Edit,
      label: 'Update User',
      action: 'update',
      color: 'text-gray-700'
    },
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
        <div className="text-xs text-gray-500">{user.type === 'celebrity' ? 'Celebrity' : 'Member'}</div>
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

export default function UsersTable({ users }) {
  const navigate = useNavigate()
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, user: null })

  const rows = users && users.length ? users : Array.from({ length: 6 }).map((_, i) => ({
    handle: 'Shaul',
    name: 'Shaul Akelo',
    id: 'I9U0JHF92H90H8230',
    followers: 32000,
    category: 'Artist',
    rating: 4.5,
    country: 'Kenya',
    trendType: i % 3 === 0 ? 'down' : 'up', // Alternate between up and down trends
    email: 'braum.h@gmail.com',
    type: i % 2 === 0 ? 'celebrity' : 'member',
    status: i % 4 === 0 ? 'Inactive' : 'Active' // Some users are inactive for demo
  }))

  const handleContextMenu = (e, user) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      user
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, user: null })
  }

  const handleAction = (action, user) => {
    // Handle different actions
    switch (action) {
      case 'message':
        openMessage(user)
        break
      case 'notify':
        openNotification(user)
        break
      case 'changeRole':
        console.log(`Changing ${user.name} to ${user.type === 'celebrity' ? 'Member' : 'Celebrity'}`)
        alert(`Changed ${user.name} to ${user.type === 'celebrity' ? 'Member' : 'Celebrity'}`)
        break
      case 'update':
        console.log(`Updating user: ${user.name}`)
        alert(`Opening update dialog for ${user.name}`)
        break
      case 'disable':
        console.log(`Disabling account: ${user.name}`)
        alert(`Disabled account for ${user.name}`)
        break
      case 'activate':
        console.log(`Activating account: ${user.name}`)
        alert(`Activated account for ${user.name}`)
        break
      default:
        break
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        {/* Mobile Layout: 2 rows */}
        <div className="md:hidden space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">All Users</h2>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>

          {/* Bottom Row: Search Field (Full Width) */}
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Users..."
              className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Layout: Title and Filter on top, Search below */}
        <div className="hidden md:block space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">All Users</h2>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>

          {/* Bottom Row: Search Field */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Users..."
              className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Followers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Trend</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider align-middle">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((u, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50"
                onContextMenu={(e) => handleContextMenu(e, u)}
              >
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="flex items-center space-x-3">
                    {/* Circular avatar with colored border */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                        u.type === 'celebrity'
                          ? 'border-orange-500 bg-orange-100'
                          : 'border-green-500 bg-green-100'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                        u.type === 'celebrity' ? 'bg-gray-600' : 'bg-gray-600'
                      }`}>
                        {u.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                      </div>
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(u.handle)}`, { state: { role: u.type === 'celebrity' ? 'celebrity' : 'member' } })}>
                      <div className="text-sm font-medium text-gray-900">@{u.handle}</div>
                      <div className="text-sm text-gray-500">{u.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="text-sm font-medium text-gray-900">{u.name}</div>
                  <div className="text-sm text-gray-500">{u.followers} posts</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 align-middle">
                  {u.followers.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 align-middle">
                  {u.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 align-middle">
                  {u.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="flex items-center justify-center">
                    {(() => {
                      const Flag = Flags[countryToCode(u.country)];
                      return Flag ? <Flag className="w-6 h-4" /> : null;
                    })()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center align-middle">
                  <div className="flex items-center justify-center">
                    {u.trendType === 'up' ? (
                      <TrendingUp size={18} className="text-green-600" />
                    ) : (
                      <TrendingDown size={18} className="text-red-600" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 align-middle">
                  {u.email}
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
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">Members</span>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        user={contextMenu.user}
        onAction={handleAction}
      />
    </div>
  )
}
