import React from 'react'

const RevenueBySourceChart = () => {
  const data = [
    { label: 'Transaction Fees', value: 40, amount: '$960K', color: '#10b981' },
    { label: 'Shop Commissions', value: 25, amount: '$600K', color: '#3b82f6' },
    { label: 'Event Tickets', value: 15, amount: '$360K', color: '#f59e0b' },
    { label: 'Gifts & Tips', value: 10, amount: '$240K', color: '#ef4444' },
    { label: 'Live Stream', value: 7, amount: '$168K', color: '#8b5cf6' },
    { label: 'Subscriptions', value: 3, amount: '$72K', color: '#ec4899' }
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const createSlice = (item, index) => {
    const percentage = item.value
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    
    const x1 = 100 + 80 * Math.cos(startAngleRad)
    const y1 = 100 + 80 * Math.sin(startAngleRad)
    const x2 = 100 + 80 * Math.cos(endAngleRad)
    const y2 = 100 + 80 * Math.sin(endAngleRad)
    
    const largeArcFlag = angle > 180 ? 1 : 0
    
    const pathData = [
      `M 100 100`,
      `L ${x1} ${y1}`,
      `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')
    
    currentAngle += angle
    
    return (
      <path
        key={index}
        d={pathData}
        fill={item.color}
        stroke="white"
        strokeWidth="3"
        className="hover:opacity-80 transition-opacity cursor-pointer"
      />
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Source</h3>
      
      {/* Pie Chart */}
      <div className="flex items-center justify-center mb-6">
        <svg width="200" height="200" className="transform -rotate-90">
          {data.map((item, index) => createSlice(item, index))}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">{item.amount}</span>
              <span className="text-xs text-gray-500">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RevenueBySourceChart


