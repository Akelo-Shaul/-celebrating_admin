import React, { useState } from 'react'
import { X, Maximize2, Minimize2, Bell, Check, Trash2, Settings } from 'lucide-react'

const NotificationModal = ({ isOpen, onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [filter, setFilter] = useState('all') // all, unread, read

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: 'New Event Registration',
      message: 'A new user has registered for the Tech Conference 2025',
      type: 'info',
      time: '5 min ago',
      read: false,
      icon: '📅'
    },
    {
      id: 2,
      title: 'Ticket Purchase',
      message: 'Sarah Johnson purchased 3 VIP tickets for Music Festival',
      type: 'success',
      time: '15 min ago',
      read: false,
      icon: '🎫'
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'Payment of $450 received from John Smith',
      type: 'success',
      time: '1 hour ago',
      read: true,
      icon: '💰'
    },
    {
      id: 4,
      title: 'Low Stock Alert',
      message: 'General admission tickets are running low (12 remaining)',
      type: 'warning',
      time: '2 hours ago',
      read: true,
      icon: '⚠️'
    },
    {
      id: 5,
      title: 'New Review Posted',
      message: 'Alex Martinez left a 5-star review for your event',
      type: 'info',
      time: '3 hours ago',
      read: true,
      icon: '⭐'
    },
    {
      id: 6,
      title: 'Refund Request',
      message: 'Customer requesting refund for Order #12345',
      type: 'warning',
      time: '4 hours ago',
      read: true,
      icon: '🔄'
    }
  ]

  const [notifications, setNotifications] = useState(mockNotifications)

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([])
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'error': return 'bg-red-50 border-red-200'
      default: return 'bg-blue-50 border-blue-200'
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[60]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed bg-white shadow-2xl z-[70] flex flex-col transition-all duration-300 ${
          isMaximized
            ? 'inset-4 rounded-lg'
            : 'top-0 md:top-16 right-0 md:right-4 left-0 md:left-auto w-full md:w-[420px] h-[100vh] md:h-[600px] md:rounded-lg rounded-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 md:px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="p-1.5 md:p-2 bg-yellow-100 rounded-full flex-shrink-0">
              <Bell size={18} className="text-orange-600 md:w-5 md:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-600">{unreadCount} unread</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <button
              onClick={handleMarkAllAsRead}
              className="p-1.5 md:p-2 hover:bg-white/50 rounded-full transition-colors"
              title="Mark all as read"
            >
              <Check size={16} className="text-gray-700 md:w-[18px] md:h-[18px]" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="hidden md:block p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              {isMaximized ? (
                <Minimize2 size={18} className="text-gray-700" />
              ) : (
                <Maximize2 size={18} className="text-gray-700" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 md:p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-700 md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 px-3 md:px-4 py-2 border-b border-gray-200 bg-white overflow-x-auto">
          {['all', 'unread', 'read'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                filter === filterType
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              {filterType === 'unread' && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-orange-500 text-white rounded-full text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Bell size={48} className="text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">No notifications to display</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 md:p-4 hover:bg-gray-100 transition-colors ${
                    !notif.read ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="text-xl md:text-2xl flex-shrink-0">{notif.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-semibold ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notif.title}
                          {!notif.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
                          )}
                        </h4>
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                        >
                          <Trash2 size={14} className="text-gray-500" />
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 mb-2 break-words">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notif.time}</span>
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkAsRead(notif.id)}
                            className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-3 md:p-4 rounded-b-lg">
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={handleClearAll}
                className="flex-1 px-3 md:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium"
              >
                Clear All
              </button>
              <button
                className="flex-1 px-3 md:px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all text-xs md:text-sm font-medium flex items-center justify-center gap-2"
              >
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default NotificationModal
