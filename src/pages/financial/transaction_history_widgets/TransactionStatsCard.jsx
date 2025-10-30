import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const TransactionStatsCard = ({ title, value, change, changeType, icon: Icon, bgColor, iconColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconColor} p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-sm font-semibold">{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

export default TransactionStatsCard





