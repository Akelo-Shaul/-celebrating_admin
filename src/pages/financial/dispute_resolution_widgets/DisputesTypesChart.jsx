import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const DisputesTypesChart = () => {
  const data = [
    { label: 'Did Not Appear', value: 42, color: '#22c55e' },
    { label: 'Overdue', value: 28, color: '#eab308' },
    { label: 'Bad Behaviour', value: 20, color: '#fbbf24' },
    { label: 'Not Received', value: 10, color: '#f97316' },
    { label: 'Not As Expected', value: 0, color: '#6b7280' }
  ]

  const chartData = {
    labels: data.filter(item => item.value > 0).map(item => item.label),
    datasets: [
      {
        data: data.filter(item => item.value > 0).map(item => item.value),
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#ef4444'
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
        position: 'right',
        align: 'center',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
          font: {
            size: 11,
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
    radius: '90%'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Disputes Types Distribution</h2>
      </div>
      
      <div style={{ height: '200px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}

export default DisputesTypesChart