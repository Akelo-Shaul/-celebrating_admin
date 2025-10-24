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
            : 'bottom-4 right-4 w-96 h-[600px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex items-center gap-3">
            {!showAllMessages && (
              <button
                onClick={handleBackToMessages}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-700" />
              </button>
            )}
            {showAllMessages ? (
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {currentRecipient?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'U'}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {currentRecipient?.name || 'User'}
                  </h3>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
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
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.isSent ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          msg.isSent
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
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
            <div className="border-t border-gray-200 bg-white p-4 rounded-b-lg">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Smile size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Image size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm"
                />
                
                {message.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                  >
                    <Send size={18} className="text-white" />
                  </button>
                ) : (
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Mic size={20} className="text-gray-600" />
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

