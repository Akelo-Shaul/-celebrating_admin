import React from 'react'
import { DollarSign, Gift, CreditCard, Users } from 'lucide-react'

const StreamRevenueWidget = ({ stream }) => {
  const revenueBreakdown = [
    {
      label: 'Super Chats',
      amount: stream.superChats,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      percentage: ((stream.superChats / stream.totalRevenue) * 100).toFixed(1)
    },
    {
      label: 'Gifts',
      amount: stream.gifts,
      icon: Gift,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      percentage: ((stream.gifts / stream.totalRevenue) * 100).toFixed(1)
    },
    {
      label: 'Subscriptions',
      amount: stream.subscriptions,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      percentage: ((stream.subscriptions / stream.totalRevenue) * 100).toFixed(1)
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Breakdown</h2>
      
      {/* Total Revenue */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
        <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
        <div className="text-3xl font-bold text-gray-900">${stream.totalRevenue.toLocaleString()}</div>
      </div>

      {/* Revenue Sources */}
      <div className="space-y-4">
        {revenueBreakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500">{item.percentage}% of total</div>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              ${item.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart/Progress */}
      <div className="mt-6">
        <div className="text-sm font-medium text-gray-700 mb-3">Revenue Distribution</div>
        <div className="space-y-2">
          {revenueBreakdown.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium text-gray-900">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${item.bgColor.replace('bg-', 'bg-').replace('-100', '-500')}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StreamRevenueWidget

