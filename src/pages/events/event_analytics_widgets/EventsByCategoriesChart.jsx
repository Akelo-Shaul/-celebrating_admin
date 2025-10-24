import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const EventsByCategoriesChart = () => {
  const chartData = {
    labels: ['Music', 'Business', 'Food', 'Launch', 'Entertainment'],
    datasets: [
      {
        data: [42, 28, 12, 10, 8],
        backgroundColor: [
          'rgb(16, 185, 129)',
          'rgb(234, 179, 8)',
          'rgb(249, 115, 22)',
          'rgb(251, 146, 60)',
          'rgb(239, 68, 68)'
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(234, 179, 8)',
          'rgb(249, 115, 22)',
          'rgb(251, 146, 60)',
          'rgb(239, 68, 68)'
        ],
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
              strokeStyle: datasets[0].borderColor[i],
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
      <h3 className="text-lg font-bold text-gray-900 mb-4">Events By Categories</h3>
      
      <div style={{ height: '220px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}

export default EventsByCategoriesChart







