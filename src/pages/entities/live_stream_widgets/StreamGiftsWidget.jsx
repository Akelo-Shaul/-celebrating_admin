import React from 'react'
import { Gift, Award, Star, Heart, Diamond, Zap } from 'lucide-react'

const StreamGiftsWidget = () => {
  // Sample gifts data
  const gifts = [
    {
      id: 1,
      name: 'Diamond Ring',
      icon: Diamond,
      count: 125,
      value: 50,
      totalValue: 6250,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'Gold Star',
      icon: Star,
      count: 245,
      value: 25,
      totalValue: 6125,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 3,
      name: 'Lightning Bolt',
      icon: Zap,
      count: 156,
      value: 30,
      totalValue: 4680,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      name: 'Heart',
      icon: Heart,
      count: 432,
      value: 5,
      totalValue: 2160,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100'
    },
    {
      id: 5,
      name: 'Trophy',
      icon: Award,
      count: 78,
      value: 40,
      totalValue: 3120,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    }
  ]

  const totalGiftValue = gifts.reduce((sum, gift) => sum + gift.totalValue, 0)
  const totalGiftCount = gifts.reduce((sum, gift) => sum + gift.count, 0)

  return (
    <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Gifts Received</h2>
        
        {/* Total Summary */}
        <div className="space-y-3">
          <div className="bg-pink-50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-600 mb-1">Total Gifts</div>
            <div className="text-2xl font-bold text-pink-600">{totalGiftCount}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-600 mb-1">Total Value</div>
            <div className="text-2xl font-bold text-green-600">${totalGiftValue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Gifts List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {gifts.map((gift) => (
          <div 
            key={gift.id} 
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className={`p-2 rounded-lg ${gift.bgColor} flex-shrink-0`}>
              <gift.icon className={`w-5 h-5 ${gift.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm truncate">{gift.name}</div>
              <div className="text-xs text-gray-600">
                {gift.count} × ${gift.value}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-gray-900 text-sm">${gift.totalValue.toLocaleString()}</div>
              <div className="text-xs text-gray-500">
                {((gift.totalValue / totalGiftValue) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Gifters Section */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm font-semibold text-gray-700 mb-3">Top Gifters</div>
        <div className="space-y-2">
          {[
            { name: '@Maria', amount: 250, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80' },
            { name: '@Shaul', amount: 180, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80' },
            { name: '@John', amount: 150, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&q=80' }
          ].map((gifter, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <img 
                  src={gifter.avatar} 
                  alt={gifter.name}
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                />
                <span className="text-xs font-medium text-gray-700 truncate">{gifter.name}</span>
              </div>
              <span className="text-xs font-bold text-gray-900 flex-shrink-0">${gifter.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StreamGiftsWidget

