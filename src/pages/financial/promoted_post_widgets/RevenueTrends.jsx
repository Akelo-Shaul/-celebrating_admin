import React from 'react'

const RevenueTrends = () => {
  const data = [
    { month: 'Jan', revenue: 18500, promotions: 98 },
    { month: 'Feb', revenue: 19800, promotions: 105 },
    { month: 'Mar', revenue: 21200, promotions: 112 },
    { month: 'Apr', revenue: 20500, promotions: 108 },
    { month: 'May', revenue: 22800, promotions: 125 },
    { month: 'Jun', revenue: 24850, promotions: 147 }
  ]

  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const maxPromotions = Math.max(...data.map(d => d.promotions))
  const revenueScale = 160 / maxRevenue
  const promotionsScale = 160 / maxPromotions

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Promotion Revenue Trends</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-600">Promotions Count</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg width="100%" height="220" viewBox="0 0 600 220">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="50"
              y1={20 + i * 40}
              x2="570"
              y2={20 + i * 40}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const value = maxRevenue - (i * maxRevenue / 4)
            return (
              <text
                key={i}
                x="40"
                y={25 + i * 40}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                ${(value / 1000).toFixed(0)}K
              </text>
            )
          })}

          {/* Lines */}
          {data.map((item, index) => {
            if (index === 0) return null
            const prevItem = data[index - 1]
            
            const x1 = 80 + (index - 1) * 90
            const x2 = 80 + index * 90
            const y1Revenue = 180 - (prevItem.revenue * revenueScale)
            const y2Revenue = 180 - (item.revenue * revenueScale)
            const y1Promo = 180 - (prevItem.promotions * promotionsScale)
            const y2Promo = 180 - (item.promotions * promotionsScale)

            return (
              <g key={index}>
                {/* Revenue line */}
                <line
                  x1={x1}
                  y1={y1Revenue}
                  x2={x2}
                  y2={y2Revenue}
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
                {/* Promotions line */}
                <line
                  x1={x1}
                  y1={y1Promo}
                  x2={x2}
                  y2={y2Promo}
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
              </g>
            )
          })}

          {/* Points */}
          {data.map((item, index) => {
            const x = 80 + index * 90
            const yRevenue = 180 - (item.revenue * revenueScale)
            const yPromo = 180 - (item.promotions * promotionsScale)

            return (
              <g key={`point-${index}`}>
                <circle cx={x} cy={yRevenue} r="5" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                <circle cx={x} cy={yPromo} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
              </g>
            )
          })}

          {/* X-axis labels */}
          {data.map((item, index) => {
            const x = 80 + index * 90
            return (
              <text
                key={`label-${index}`}
                x={x}
                y="200"
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

export default RevenueTrends




