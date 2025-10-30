import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const TicketDistributionWidget = () => {
  const data = {
    labels: ['VIP', 'General', 'Early Bird', 'Student', 'Group'],
    datasets: [
      {
        data: [25, 35, 20, 12, 8],
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6'
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
          padding: 15,
          font: {
            size: 13,
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
            return `${label}: ${value}%`
          }
        }
      }
    },
    cutout: '70%',
    radius: '90%',
    borderWidth: 3
  }

  const ticketTypes = [
    { name: 'VIP', count: 11408, percentage: 25, color: 'bg-yellow-500' },
    { name: 'General', count: 15971, percentage: 35, color: 'bg-blue-500' },
    { name: 'Early Bird', count: 9126, percentage: 20, color: 'bg-green-500' },
    { name: 'Student', count: 5476, percentage: 12, color: 'bg-purple-500' },
    { name: 'Group', count: 3651, percentage: 8, color: 'bg-orange-500' }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Ticket Distribution</h2>
        <p className="text-sm text-gray-500 mt-1">By ticket type</p>
      </div>

      <div className="p-6">
        <div style={{ height: '250px' }} className="mb-6">
          <Doughnut data={data} options={options} />
        </div>

        <div className="space-y-3">
          {ticketTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                <span className="text-sm text-gray-700">{type.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-gray-900">{type.count.toLocaleString()}</span>
                <span className="text-sm text-gray-500 w-12 text-right">{type.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">Total Tickets</span>
          <span className="text-lg font-bold text-gray-900">45,632</span>
        </div>
      </div>
    </div>
  )
}

export default TicketDistributionWidget