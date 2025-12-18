import React, { useState, useRef, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const FeeTrends = () => {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState('line')

  const data = [
    { month: 'Jan', deposit: 320000, withdrawal: 240000, escrow: 120000, booking: 80000, ticket: 40000 },
    { month: 'Feb', deposit: 340000, withdrawal: 255000, escrow: 127500, booking: 85000, ticket: 42500 },
    { month: 'Mar', deposit: 360000, withdrawal: 270000, escrow: 135000, booking: 90000, ticket: 45000 },
    { month: 'Apr', deposit: 370000, withdrawal: 277500, escrow: 138750, booking: 92500, ticket: 46250 },
    { month: 'May', deposit: 380000, withdrawal: 285000, escrow: 142500, booking: 95000, ticket: 47500 },
    { month: 'Jun', deposit: 384000, withdrawal: 288000, escrow: 144000, booking: 96000, ticket: 48000 }
  ]

  const feeTypes = [
    { key: 'deposit', color: '#10b981', label: 'Deposit' },
    { key: 'withdrawal', color: '#3b82f6', label: 'Withdrawal' },
    { key: 'escrow', color: '#f59e0b', label: 'Escrow' },
    { key: 'booking', color: '#ef4444', label: 'Booking' },
    { key: 'ticket', color: '#8b5cf6', label: 'Ticket' }
  ]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb',
        titleFont: { size: 12, weight: '500' },
        bodyFont: { size: 11 },
        padding: 10,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || ''
            const value = context.parsed.y
            return `${label}: $${(value / 1000).toFixed(0)}K`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 6
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 6,
          callback: (value) => `$${(value / 1000).toFixed(0)}K`
        }
      }
    }
  }

  const buildChartData = () => {
    const ctx = chartRef.current?.ctx
    const height = chartRef.current?.height || 250

    const gradients = {}
    feeTypes.forEach(type => {
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, `${type.color}40`)
        gradient.addColorStop(1, `${type.color}00`)
        gradients[type.key] = gradient
      }
    })

    return {
      labels: data.map(d => d.month),
      datasets: feeTypes.map(type => ({
        label: type.label,
        data: data.map(d => d[type.key]),
        borderColor: type.color,
        backgroundColor: chartType === 'line' ? (gradients[type.key] || type.color + '40') : type.color + '80',
        borderWidth: 3,
        fill: chartType === 'line',
        tension: chartType === 'line' ? 0.4 : 0,
        pointRadius: chartType === 'line' ? 0 : 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: type.color,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }))
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [chartType])

  const ChartComponent = chartType === 'line' ? Line : Bar

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Fee Revenue Trends</h3>
        {/* Chart Type Toggle */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1 w-fit">
          <button
            onClick={() => setChartType('line')}
            className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded transition-colors ${
              chartType === 'line'
                ? 'bg-white text-orange-600 shadow-sm font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded transition-colors ${
              chartType === 'bar'
                ? 'bg-white text-orange-600 shadow-sm font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div style={{ height: '220px' }}>
        <ChartComponent
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
    </div>
  )
}

export default FeeTrends






