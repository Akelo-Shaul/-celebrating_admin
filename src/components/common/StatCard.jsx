import React, { useState } from 'react'
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react'

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  bgColor = 'bg-white',
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  dropdown = null, // { options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'Today', onChange: (value) => {} }
  subtitle = null,
  prefix = '',
  suffix = '',
  comparisonText = null // Custom comparison text or null for auto-generated
}) => {
  const [selectedOption, setSelectedOption] = useState(dropdown?.defaultValue || dropdown?.options?.[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
    if (dropdown?.onChange) {
      dropdown.onChange(option)
    }
  }

  // Generate dynamic comparison text based on selected period
  const getComparisonText = () => {
    if (comparisonText) return comparisonText
    if (!dropdown) return 'compared to last month'
    
    const timeMap = {
      'Today': 'compared to yesterday',
      'This Week': 'compared to last week',
      'This Month': 'compared to last month',
      'This Quarter': 'compared to last quarter',
      'This Year': 'compared to last year'
    }
    
    return timeMap[selectedOption] || 'compared to previous period'
  }

  return (
    <div className={`${bgColor} rounded-lg shadow-sm p-4 md:p-6 border border-gray-200`}>
      {/* Header Row */}
      <div className="flex items-start justify-between mb-3 md:mb-4">
        {/* Icon */}
        {Icon && (
          <div className={`${iconBgColor} ${iconColor} p-2 md:p-3 rounded-lg`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        )}

        {/* Trend or Dropdown */}
        <div className="flex items-center gap-2">
          {/* Change Indicator */}
          {change && !dropdown && (
            <div className={`flex items-center gap-1 ${
              changeType === 'up' ? 'text-green-600' : 
              changeType === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {changeType === 'up' && <TrendingUp size={16} />}
              {changeType === 'down' && <TrendingDown size={16} />}
              <span className="text-sm font-semibold">{change}</span>
            </div>
          )}

          {/* Dropdown */}
          {dropdown && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                <span>{selectedOption}</span>
                <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    {dropdown.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          selectedOption === option ? 'bg-gray-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>

      {/* Value */}
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-xl md:text-2xl font-bold text-gray-900">{prefix}</span>}
        <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
        {suffix && <span className="text-lg md:text-xl font-semibold text-gray-700">{suffix}</span>}
      </div>

      {/* Subtitle or Change (if dropdown is present) */}
      {(subtitle || (change && dropdown)) && (
        <div className="mt-2 flex items-center gap-2">
          {change && dropdown && (
            <div className={`flex items-center gap-1 ${
              changeType === 'up' ? 'text-green-600' : 
              changeType === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {changeType === 'up' && <TrendingUp size={14} />}
              {changeType === 'down' && <TrendingDown size={14} />}
              <span className="text-xs font-semibold">{change}</span>
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
      )}

      {/* Comparison Text - shown when there's a trend/change */}
      {change && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">{getComparisonText()}</p>
        </div>
      )}
    </div>
  )
}

export default StatCard

