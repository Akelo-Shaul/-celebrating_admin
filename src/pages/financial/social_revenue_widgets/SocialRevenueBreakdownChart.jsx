import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const SocialRevenueBreakdownChart = () => {
  const data = [
    { label: 'Gifts & Tips', value: 77, amount: '$240K', color: '#ec4899' },
    { label: 'Verified Badges', value: 15, amount: '$48K', color: '#3b82f6' },
    { label: 'Promoted Posts', value: 8, amount: '$24K', color: '#8b5cf6' }
  ]

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderColor: 'white',
        borderWidth: 3
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 12,
          font: { size: 12, weight: '500' },
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed || 0
            const dataItem = data[context.dataIndex]
            return `${label}: ${value}% (${dataItem.amount})`
          }
        }
      }
    },
    cutout: '70%',
    radius: '90%'
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Social Revenue Breakdown</h3>

      <div style={{ height: '180px' }} className="mb-4 md:mb-6">
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Stats Legend */}
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

export default SocialRevenueBreakdownChart






