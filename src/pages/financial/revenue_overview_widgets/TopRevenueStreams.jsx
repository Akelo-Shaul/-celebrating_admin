import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const TopRevenueStreams = () => {
  const streams = [
    { 
      name: 'Transaction Fees', 
      revenue: '$960,000', 
      percentage: 40, 
      trend: '+12.5%', 
      isPositive: true,
      color: 'bg-green-500'
    },
    { 
      name: 'Shop Commissions', 
      revenue: '$600,000', 
      percentage: 25, 
      trend: '+8.3%', 
      isPositive: true,
      color: 'bg-blue-500'
    },
    { 
      name: 'Event Tickets', 
      revenue: '$360,000', 
      percentage: 15, 
      trend: '+15.2%', 
      isPositive: true,
      color: 'bg-orange-500'
    },
    { 
      name: 'Gifts & Tips', 
      revenue: '$240,000', 
      percentage: 10, 
      trend: '-2.1%', 
      isPositive: false,
      color: 'bg-red-500'
    },
    { 
      name: 'Live Stream', 
      revenue: '$168,000', 
      percentage: 7, 
      trend: '+5.6%', 
      isPositive: true,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Revenue Streams</h3>
      
      <div className="space-y-4">
        {streams.map((stream, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${stream.color}`} />
                <span className="text-sm font-medium text-gray-900">{stream.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">{stream.revenue}</span>
                <span className={`text-xs font-semibold flex items-center gap-1 ${stream.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stream.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stream.trend}
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${stream.color}`}
                style={{ width: `${stream.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopRevenueStreams





