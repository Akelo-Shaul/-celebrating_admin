import React from 'react'

const FeeTrends = () => {
  const data = [
    { month: 'Jan', deposit: 320000, withdrawal: 240000, escrow: 120000, booking: 80000, ticket: 40000 },
    { month: 'Feb', deposit: 340000, withdrawal: 255000, escrow: 127500, booking: 85000, ticket: 42500 },
    { month: 'Mar', deposit: 360000, withdrawal: 270000, escrow: 135000, booking: 90000, ticket: 45000 },
    { month: 'Apr', deposit: 370000, withdrawal: 277500, escrow: 138750, booking: 92500, ticket: 46250 },
    { month: 'May', deposit: 380000, withdrawal: 285000, escrow: 142500, booking: 95000, ticket: 47500 },
    { month: 'Jun', deposit: 384000, withdrawal: 288000, escrow: 144000, booking: 96000, ticket: 48000 }
  ]

  const maxValue = Math.max(...data.map(d => d.deposit))
  const scale = 160 / maxValue

  const feeTypes = [
    { key: 'deposit', color: '#10b981', label: 'Deposit' },
    { key: 'withdrawal', color: '#3b82f6', label: 'Withdrawal' },
    { key: 'escrow', color: '#f59e0b', label: 'Escrow' },
    { key: 'booking', color: '#ef4444', label: 'Booking' },
    { key: 'ticket', color: '#8b5cf6', label: 'Ticket' }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Fee Revenue Trends</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {feeTypes.map((type, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
              <span className="text-xs text-gray-600">{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg width="100%" height="200" viewBox="0 0 600 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="40"
              y1={20 + i * 40}
              x2="570"
              y2={20 + i * 40}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Lines */}
          {feeTypes.map((type, typeIndex) => (
            <g key={typeIndex}>
              {data.map((item, index) => {
                if (index === 0) return null
                const prevItem = data[index - 1]
                
                const x1 = 70 + (index - 1) * 90
                const x2 = 70 + index * 90
                const y1 = 180 - (prevItem[type.key] * scale)
                const y2 = 180 - (item[type.key] * scale)

                return (
                  <line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={type.color}
                    strokeWidth="2"
                  />
                )
              })}
              
              {/* Points */}
              {data.map((item, index) => {
                const x = 70 + index * 90
                const y = 180 - (item[type.key] * scale)
                return (
                  <circle 
                    key={`point-${index}`}
                    cx={x} 
                    cy={y} 
                    r="4" 
                    fill={type.color} 
                    stroke="white" 
                    strokeWidth="2" 
                  />
                )
              })}
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((item, index) => {
            const x = 70 + index * 90
            return (
              <text
                key={`label-${index}`}
                x={x}
                y="195"
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {item.month}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default FeeTrends



