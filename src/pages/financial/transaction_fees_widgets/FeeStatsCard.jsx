import React from 'react'
import { DollarSign, Download, Upload, Shield, Calendar, Ticket, ChevronDown } from 'lucide-react'

const FeeStatsCard = ({ title, value, subtitle, change, hasDropdown, dropdownValue, icon }) => {
  const icons = {
    dollar: DollarSign,
    download: Download,
    upload: Upload,
    shield: Shield,
    calendar: Calendar,
    ticket: Ticket
  }

  const Icon = icons[icon] || DollarSign
  const isPositive = change && change.startsWith('+')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        {hasDropdown && (
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            {dropdownValue}
            <ChevronDown className="w-3 h-3" />
          </button>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      
      {subtitle && (
        <div className="flex items-center gap-2 text-xs">
          {change && (
            <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
          )}
          <span className="text-gray-500">{subtitle}</span>
        </div>
      )}
    </div>
  )
}

export default FeeStatsCard






