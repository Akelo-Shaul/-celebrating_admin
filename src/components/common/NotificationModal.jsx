import React, { useState } from 'react'
import { X, Maximize2, Minimize2, Send, Bell, Users, Mail, AlertCircle } from 'lucide-react'

const NotificationModal = ({ isOpen, onClose, recipient }) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'info', // info, success, warning, error
    priority: 'normal', // low, normal, high, urgent
    sendTo: 'single', // single, group, all
  })

  const notificationTypes = [
    { value: 'info', label: 'Information', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
    { value: 'success', label: 'Success', color: 'bg-green-100 text-green-700', icon: Bell },
    { value: 'warning', label: 'Warning', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
    { value: 'error', label: 'Alert/Error', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  ]

  const priorityLevels = [
    { value: 'low', label: 'Low Priority', color: 'text-gray-600' },
    { value: 'normal', label: 'Normal', color: 'text-blue-600' },
    { value: 'high', label: 'High Priority', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
  ]

  const handleSendNotification = () => {
    if (!notificationData.title.trim() || !notificationData.message.trim()) {
      alert('Please fill in both title and message')
      return
    }

    console.log('Sending notification:', {
      ...notificationData,
      recipient: recipient?.name || 'Unknown',
    })
    
    alert(`Notification sent to ${recipient?.name || 'recipient'}!\n\nTitle: ${notificationData.title}\nMessage: ${notificationData.message}\nType: ${notificationData.type}\nPriority: ${notificationData.priority}`)
    
    // Reset form
    setNotificationData({
      title: '',
      message: '',
      type: 'info',
      priority: 'normal',
      sendTo: 'single',
    })
  }

  if (!isOpen) return null

  const currentType = notificationTypes.find(t => t.value === notificationData.type)

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-[60]"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className={`fixed bg-white rounded-lg shadow-2xl z-[70] flex flex-col transition-all duration-300 ${
          isMaximized 
            ? 'inset-4' 
            : 'top-20 right-4 w-[500px] max-h-[calc(100vh-6rem)] overflow-hidden'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Bell size={20} className="text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Send Notification</h3>
              {recipient && (
                <p className="text-xs text-gray-600">To: {recipient.name || recipient.username}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              {isMaximized ? (
                <Minimize2 size={18} className="text-gray-700" />
              ) : (
                <Maximize2 size={18} className="text-gray-700" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-4">
            {/* Recipient Info Card */}
            {recipient && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold">
                    {recipient.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'U'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{recipient.name || 'User'}</h4>
                    <p className="text-sm text-gray-500">{recipient.username || recipient.email || 'No email'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {notificationTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.value}
                      onClick={() => setNotificationData({ ...notificationData, type: type.value })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        notificationData.type === type.value
                          ? `${type.color} border-current`
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span className="text-sm font-medium">{type.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Priority Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                value={notificationData.priority}
                onChange={(e) => setNotificationData({ ...notificationData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {priorityLevels.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Title
              </label>
              <input
                type="text"
                value={notificationData.title}
                onChange={(e) => setNotificationData({ ...notificationData, title: e.target.value })}
                placeholder="Enter notification title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {notificationData.title.length}/100 characters
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Message
              </label>
              <textarea
                value={notificationData.message}
                onChange={(e) => setNotificationData({ ...notificationData, message: e.target.value })}
                placeholder="Enter notification message..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {notificationData.message.length}/500 characters
              </p>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className={`p-4 rounded-lg border-l-4 ${
                notificationData.type === 'info' ? 'bg-blue-50 border-blue-500' :
                notificationData.type === 'success' ? 'bg-green-50 border-green-500' :
                notificationData.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                'bg-red-50 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  {currentType && <currentType.icon size={20} className={
                    notificationData.type === 'info' ? 'text-blue-600' :
                    notificationData.type === 'success' ? 'text-green-600' :
                    notificationData.type === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  } />}
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 mb-1">
                      {notificationData.title || 'Notification Title'}
                    </h5>
                    <p className="text-sm text-gray-700">
                      {notificationData.message || 'Notification message will appear here...'}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Priority: {priorityLevels.find(p => p.value === notificationData.priority)?.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Send Button */}
        <div className="border-t border-gray-200 bg-white p-4 rounded-b-lg">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSendNotification}
              disabled={!notificationData.title.trim() || !notificationData.message.trim()}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationModal


