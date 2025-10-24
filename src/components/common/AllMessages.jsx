import React, { useState } from 'react'
import { Search, Edit } from 'lucide-react'

const AllMessages = ({ onSelectConversation }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('users') // 'users' or 'organizations'

  // Mock conversations
  const mockConversations = [
    {
      id: 1,
      name: 'Shaul Akelo',
      username: '@Shaul',
      avatar: null,
      lastMessage: 'You sent an attachment.',
      timestamp: '7h',
      unread: false,
      online: true,
      type: 'user'
    },
    {
      id: 2,
      name: 'La DUKE',
      username: '@LaDuke',
      avatar: null,
      lastMessage: '🤣🤣 shit not new to me',
      timestamp: '9h',
      unread: true,
      unreadCount: 2,
      online: true,
      type: 'user'
    },
    {
      id: 3,
      name: 'Phoebe',
      username: '@Phoebe',
      avatar: null,
      lastMessage: 'You sent an attachment.',
      timestamp: '17h',
      unread: false,
      online: false,
      type: 'user'
    },
    {
      id: 4,
      name: 'Shaul Oti',
      username: '@ShaulOti',
      avatar: null,
      lastMessage: 'You sent an attachment.',
      timestamp: '17h',
      unread: false,
      online: true,
      type: 'user'
    },
    {
      id: 5,
      name: 'THE STORM',
      username: '@TheStorm',
      avatar: null,
      lastMessage: 'You sent an attachment.',
      timestamp: '21h',
      unread: false,
      online: false,
      type: 'organization'
    },
    {
      id: 6,
      name: 'Ngong Racecourse',
      username: '@NgongRace',
      avatar: null,
      lastMessage: 'Ngong sent an attachment.',
      timestamp: '6d',
      unread: false,
      online: false,
      type: 'organization'
    },
    {
      id: 7,
      name: 'Kilimani Tech Hub',
      username: '@KiliTech',
      avatar: null,
      lastMessage: 'Meeting scheduled for tomorrow',
      timestamp: '2d',
      unread: true,
      unreadCount: 1,
      online: true,
      type: 'organization'
    }
  ]

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = conv.type === activeTab
    return matchesSearch && matchesTab
  })

  // Count unread messages for each tab
  const unreadCounts = {
    users: mockConversations.filter(c => c.type === 'user' && c.unread).length,
    organizations: mockConversations.filter(c => c.type === 'organization' && c.unread).length
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === 'users'
              ? 'text-blue-600 bg-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Users</span>
            {unreadCounts.users > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                {unreadCounts.users}
              </span>
            )}
          </div>
          {activeTab === 'users' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('organizations')}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === 'organizations'
              ? 'text-blue-600 bg-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Organizations</span>
            {unreadCounts.organizations > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                {unreadCounts.organizations}
              </span>
            )}
          </div>
          {activeTab === 'organizations' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 px-4">
            <p className="text-sm text-center">
              {searchQuery 
                ? `No ${activeTab === 'users' ? 'users' : 'organizations'} found matching "${searchQuery}"`
                : `No ${activeTab === 'users' ? 'user' : 'organization'} conversations yet`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {conv.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Message Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {conv.name}
                      </h4>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {conv.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        conv.unread ? 'font-semibold text-gray-900' : 'text-gray-500'
                      }`}>
                        {conv.lastMessage}
                      </p>
                      {conv.unread && conv.unreadCount && (
                        <span className="flex-shrink-0 ml-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* New Message Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
          <Edit size={18} />
          <span className="text-sm font-medium">New Message</span>
        </button>
      </div>
    </div>
  )
}

export default AllMessages


