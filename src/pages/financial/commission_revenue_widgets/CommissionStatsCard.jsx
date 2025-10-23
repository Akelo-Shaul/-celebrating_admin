import React from 'react'
import { ChevronDown } from 'lucide-react'

const CommissionStatsCard = ({ title, value, subtitle, change, hasDropdown, dropdownValue }) => {
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
      
      <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
      
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

export default CommissionStatsCard


