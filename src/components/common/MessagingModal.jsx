import React, { useState } from 'react'
import { X, Maximize2, Minimize2, ArrowLeft, Send, Image, Mic, Smile, Paperclip } from 'lucide-react'
import AllMessages from './AllMessages'

const MessagingModal = ({ isOpen, onClose, recipient }) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [showAllMessages, setShowAllMessages] = useState(false)
  const [currentRecipient, setCurrentRecipient] = useState(recipient)
  const [message, setMessage] = useState('')

  // Update current recipient when prop changes
  React.useEffect(() => {
    if (recipient) {
      setCurrentRecipient(recipient)
      setShowAllMessages(false)
    }
  }, [recipient])

  // Mock messages for demonstration
  const mockMessages = [
    {
      id: 1,
      text: 'Hey! How are you doing?',
      sender: 'user',
      timestamp: '2:15 PM',
      isSent: true
    },
    {
      id: 2,
      text: 'Hi! I\'m doing great, thanks for asking!',
      sender: currentRecipient?.name || 'User',
      timestamp: '2:16 PM',
      isSent: false
    },
    {
      id: 3,
      text: 'That\'s wonderful to hear!',
      sender: 'user',
      timestamp: '2:18 PM',
      isSent: true
    },
    {
      id: 4,
      text: 'How can I help you today?',
      sender: currentRecipient?.name || 'User',
      timestamp: '2:19 PM',
      isSent: false
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message, 'to:', currentRecipient)
      setMessage('')
      // Here you would typically send the message to your backend
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSelectConversation = (user) => {
    setCurrentRecipient(user)
    setShowAllMessages(false)
  }

  const handleBackToMessages = () => {
    setShowAllMessages(true)
    setCurrentRecipient(null)
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
        className={`fixed bg-white rounded-lg shadow-2xl z-[70] flex flex-col transition-all duration-300 ${
          isMaximized
            ? 'inset-4'
            : 'bottom-0 md:bottom-4 right-0 md:right-4 left-0 md:left-auto w-full md:w-96 h-[100vh] md:h-[600px] md:rounded-lg rounded-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 md:px-4 py-3 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            {!showAllMessages && (
              <button
                onClick={handleBackToMessages}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-700" />
              </button>
            )}
            {showAllMessages ? (
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Messages</h3>
            ) : (
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold text-sm md:text-base flex-shrink-0">
                  {currentRecipient?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'U'}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                    {currentRecipient?.name || 'User'}
                  </h3>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMaximized ? (
                <Minimize2 size={18} className="text-gray-700" />
              ) : (
                <Maximize2 size={18} className="text-gray-700" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        {showAllMessages ? (
          <AllMessages onSelectConversation={handleSelectConversation} />
        ) : (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
              <div className="space-y-3 md:space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] md:max-w-[70%] ${msg.isSent ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl px-3 md:px-4 py-2 ${
                          msg.isSent
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-3 md:p-4 rounded-b-lg">
              <div className="flex items-center gap-1 md:gap-2">
                <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                  <Image size={18} className="text-gray-600 md:w-5 md:h-5" />
                </button>
                <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                  <Paperclip size={18} className="text-gray-600 md:w-5 md:h-5" />
                </button>

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message..."
                  className="flex-1 px-3 md:px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm min-w-0"
                />

                {message.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-1.5 md:p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors flex-shrink-0"
                  >
                    <Send size={16} className="text-white md:w-[18px] md:h-[18px]" />
                  </button>
                ) : (
                  <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                    <Mic size={18} className="text-gray-600 md:w-5 md:h-5" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MessagingModal

