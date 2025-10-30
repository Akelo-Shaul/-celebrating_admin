import React from 'react'
import { ChevronDown } from 'lucide-react'

const RevenueStatsCard = ({ title, value, subtitle, change, period, hasDropdown, dropdownValue, color = "green" }) => {
  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  }

  const isPositive = change && change.startsWith('+')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {hasDropdown && (
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            {dropdownValue}
            <ChevronDown className="w-3 h-3" />
          </button>
        )}
      </div>
      
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-2`}>
        {value}
      </div>
      
      {subtitle && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {change && (
            <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
          )}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  )
}

export default RevenueStatsCard





