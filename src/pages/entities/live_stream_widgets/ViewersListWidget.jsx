import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'

const ViewersListWidget = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Sample viewers data
  const viewers = [
    {
      id: 1,
      name: '@Shaul',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      country: 'KE',
      watchTime: '2h 15m',
      interactions: 45
    },
    {
      id: 2,
      name: '@Maria',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      country: 'KE',
      watchTime: '1h 50m',
      interactions: 32
    },
    {
      id: 3,
      name: '@John',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      country: 'KE',
      watchTime: '2h 10m',
      interactions: 28
    },
    {
      id: 4,
      name: '@Lisa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      country: 'KE',
      watchTime: '1h 30m',
      interactions: 18
    },
    {
      id: 5,
      name: '@Ahmed',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      country: 'KE',
      watchTime: '45m',
      interactions: 12
    },
    {
      id: 6,
      name: '@Sophie',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      country: 'KE',
      watchTime: '1h 20m',
      interactions: 24
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Active Viewers</h2>
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
            placeholder="Search viewers ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Viewers List */}
      <div className="flex-1 overflow-y-auto">
        {viewers.map((viewer) => (
          <div 
            key={viewer.id} 
            className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => navigate(`/profile/${encodeURIComponent(viewer.name)}`)}
          >
            <div className="flex items-center gap-3">
              <img 
                src={viewer.avatar} 
                alt={viewer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">{viewer.name}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>Watch: {viewer.watchTime}</span>
                  <span>•</span>
                  <span>{viewer.interactions} interactions</span>
                </div>
              </div>
              <div className="flex justify-center">
                {React.createElement(Flags[viewer.country], { 
                  className: "w-8 h-6 rounded shadow-sm"
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Active</span>
          <span className="font-bold text-gray-900">{viewers.length} viewers</span>
        </div>
      </div>
    </div>
  )
}

export default ViewersListWidget

