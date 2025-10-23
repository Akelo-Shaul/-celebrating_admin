import React from 'react'

const RevenueGrowthChart = () => {
  const data = [
    { month: 'Jan', revenue: 1800000, transactions: 12000 },
    { month: 'Feb', revenue: 1900000, transactions: 13500 },
    { month: 'Mar', revenue: 2100000, transactions: 15000 },
    { month: 'Apr', revenue: 2000000, transactions: 14200 },
    { month: 'May', revenue: 2200000, transactions: 16000 },
    { month: 'Jun', revenue: 2400000, transactions: 17500 }
  ]

  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const maxTransactions = Math.max(...data.map(d => d.transactions))
  const revenueScale = 180 / maxRevenue
  const transactionsScale = 180 / maxTransactions

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Growth Trend</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-600">Transactions</span>
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
              y1={20 + i * 45}
              x2="570"
              y2={20 + i * 45}
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
                y={25 + i * 45}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                ${(value / 1000000).toFixed(1)}M
              </text>
            )
          })}

          {/* Lines and points */}
          {data.map((item, index) => {
            if (index === 0) return null
            const prevItem = data[index - 1]
            
            const x1 = 80 + (index - 1) * 90
            const x2 = 80 + index * 90
            const y1Revenue = 200 - (prevItem.revenue * revenueScale)
            const y2Revenue = 200 - (item.revenue * revenueScale)
            const y1Trans = 200 - (prevItem.transactions * transactionsScale)
            const y2Trans = 200 - (item.transactions * transactionsScale)

            return (
              <g key={index}>
                {/* Revenue line */}
                <line
                  x1={x1}
                  y1={y1Revenue}
                  x2={x2}
                  y2={y2Revenue}
                  stroke="#10b981"
                  strokeWidth="3"
                />
                {/* Transactions line */}
                <line
                  x1={x1}
                  y1={y1Trans}
                  x2={x2}
                  y2={y2Trans}
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
              </g>
            )
          })}

          {/* Points */}
          {data.map((item, index) => {
            const x = 80 + index * 90
            const yRevenue = 200 - (item.revenue * revenueScale)
            const yTrans = 200 - (item.transactions * transactionsScale)

            return (
              <g key={`point-${index}`}>
                <circle cx={x} cy={yRevenue} r="5" fill="#10b981" stroke="white" strokeWidth="2" />
                <circle cx={x} cy={yTrans} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
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
                y="215"
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

export default RevenueGrowthChart


