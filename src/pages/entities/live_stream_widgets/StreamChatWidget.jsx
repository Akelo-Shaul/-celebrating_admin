import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'

const StreamChatWidget = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Sample chat messages
  const messages = [
    {
      id: 1,
      user: {
        name: '@Shaul',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      message: 'This is amazing! Love the energy 🔥',
      timestamp: '10:23 AM',
      type: 'regular'
    },
    {
      id: 2,
      user: {
        name: '@Maria',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      },
      message: 'Super chat! Keep up the great work!',
      timestamp: '10:24 AM',
      type: 'superChat',
      amount: 50
    },
    {
      id: 3,
      user: {
        name: '@John',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
      },
      message: 'Can you play my request next?',
      timestamp: '10:25 AM',
      type: 'regular'
    },
    {
      id: 4,
      user: {
        name: '@Lisa',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
      },
      message: 'Sent you a gift! 🎁',
      timestamp: '10:26 AM',
      type: 'gift',
      giftName: 'Diamond Ring'
    },
    {
      id: 5,
      user: {
        name: '@Ahmed',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
      },
      message: 'Best stream ever! 👏',
      timestamp: '10:27 AM',
      type: 'regular'
    },
    {
      id: 6,
      user: {
        name: '@Sophie',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
      },
      message: 'Hello from Kenya! 🇰🇪',
      timestamp: '10:28 AM',
      type: 'regular'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Live Chat</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Search className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-3">
            <img 
              src={msg.user.avatar} 
              alt={msg.user.name}
              className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80"
              onClick={() => navigate(`/profile/${encodeURIComponent(msg.user.name)}`)}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="text-sm font-bold text-gray-900 cursor-pointer hover:underline"
                  onClick={() => navigate(`/profile/${encodeURIComponent(msg.user.name)}`)}
                >
                  {msg.user.name}
                </span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              
              {msg.type === 'superChat' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded mb-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-yellow-800">SUPER CHAT</span>
                    <span className="text-sm font-bold text-yellow-800">${msg.amount}</span>
                  </div>
                  <p className="text-sm text-gray-800">{msg.message}</p>
                </div>
              )}
              
              {msg.type === 'gift' && (
                <div className="bg-pink-100 border-l-4 border-pink-500 p-3 rounded mb-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-pink-800">GIFT</span>
                    <span className="text-xs text-pink-700">{msg.giftName}</span>
                  </div>
                  <p className="text-sm text-gray-800">{msg.message}</p>
                </div>
              )}
              
              {msg.type === 'regular' && (
                <p className="text-sm text-gray-700">{msg.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StreamChatWidget

