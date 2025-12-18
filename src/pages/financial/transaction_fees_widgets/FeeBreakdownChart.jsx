import React from 'react'

const FeeBreakdownChart = () => {
  const data = [
    { label: 'Deposit Fees', value: 40, amount: '$384K', color: '#10b981' },
    { label: 'Withdrawal Fees', value: 30, amount: '$288K', color: '#3b82f6' },
    { label: 'Escrow Fees', value: 15, amount: '$144K', color: '#f59e0b' },
    { label: 'Booking Fees', value: 10, amount: '$96K', color: '#ef4444' },
    { label: 'Ticket Fees', value: 5, amount: '$48K', color: '#8b5cf6' }
  ]

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
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Fee Type Breakdown</h3>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-4 md:mb-6">
        <svg width="180" height="180" viewBox="0 0 200 200" className="transform -rotate-90 w-full max-w-[180px]">
          {/* Background circle */}
          <circle cx="100" cy="100" r="60" fill="white" />
          {data.map((item, index) => createSlice(item, index))}
          {/* Center circle for donut effect */}
          <circle cx="100" cy="100" r="50" fill="white" />
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-2 md:space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs md:text-sm text-gray-600 truncate">{item.label}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <span className="text-xs md:text-sm font-semibold text-gray-900">{item.amount}</span>
              <span className="text-xs text-gray-500">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeeBreakdownChart






