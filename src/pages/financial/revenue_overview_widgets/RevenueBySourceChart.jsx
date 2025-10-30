import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const RevenueBySourceChart = () => {
  const data = [
    { label: 'Transaction Fees', value: 40, amount: '$960K', color: '#10b981' },
    { label: 'Shop Commissions', value: 25, amount: '$600K', color: '#3b82f6' },
    { label: 'Event Tickets', value: 15, amount: '$360K', color: '#f59e0b' },
    { label: 'Gifts & Tips', value: 10, amount: '$240K', color: '#ef4444' },
    { label: 'Live Stream', value: 7, amount: '$168K', color: '#8b5cf6' },
    { label: 'Subscriptions', value: 3, amount: '$72K', color: '#ec4899' }
  ]

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#ec4899'
        ],
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
          font: {
            size: 12,
            weight: '500'
          },
          color: '#374151',
          generateLabels: function(chart) {
            const datasets = chart.data.datasets
            return chart.data.labels.map((label, i) => ({
              text: label,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: datasets[0].borderColor,
              lineWidth: 0,
              hidden: false,
              index: i,
              pointStyle: 'circle'
            }))
          }
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
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue by Source</h3>
      
      <div style={{ height: '200px' }} className="mb-4">
        <Doughnut data={chartData} options={options} />
      </div>
      
      {/* Stats Legend */}
      <div className="space-y-3 mt-4">
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