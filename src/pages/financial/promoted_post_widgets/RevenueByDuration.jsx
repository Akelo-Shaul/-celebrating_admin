import React from 'react'

const RevenueByDuration = () => {
  const data = [
    { duration: '24 Hours', revenue: '$8,950', percentage: 36, count: 89, color: '#10b981' },
    { duration: '3 Days', revenue: '$6,710', percentage: 27, count: 34, color: '#3b82f6' },
    { duration: '7 Days', revenue: '$5,220', percentage: 21, count: 18, color: '#f59e0b' },
    { duration: '14 Days', revenue: '$2,485', percentage: 10, count: 9, color: '#8b5cf6' },
    { duration: '30 Days', revenue: '$1,485', percentage: 6, count: 4, color: '#ec4899' }
  ]

  let currentAngle = 0

  const createSlice = (item, index) => {
    const percentage = item.percentage
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
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Promotion Duration</h3>
      
      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle cx="100" cy="100" r="60" fill="white" />
          {data.map((item, index) => createSlice(item, index))}
          {/* Center circle for donut effect */}
          <circle cx="100" cy="100" r="50" fill="white" />
        </svg>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">{item.count} posts</span>
              <span className="text-sm font-semibold text-gray-900">{item.revenue}</span>
              <span className="text-xs text-gray-500">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RevenueByDuration



