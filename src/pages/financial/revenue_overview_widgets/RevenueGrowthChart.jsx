import React, { useRef, useEffect, useState } from 'react'
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

const RevenueGrowthChart = () => {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState('line')

  const data = [
    { month: 'Jan', revenue: 1800000, transactions: 12000 },
    { month: 'Feb', revenue: 1900000, transactions: 13500 },
    { month: 'Mar', revenue: 2100000, transactions: 15000 },
    { month: 'Apr', revenue: 2000000, transactions: 14200 },
    { month: 'May', revenue: 2200000, transactions: 16000 },
    { month: 'Jun', revenue: 2400000, transactions: 17500 }
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
        display: false,
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
          title: (context) => context[0].label,
          label: (context) => {
            const label = context.dataset.label || ''
            const value = context.parsed.y
            if (label === 'Revenue') {
              return `${label}: $${(value / 1000000).toFixed(2)}M`
            } else {
              return `${label}: ${value.toLocaleString()}`
            }
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
          drawBorder: true,
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 6,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 6,
          callback: (value) => `$${(value / 1000000).toFixed(1)}M`,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 6,
          callback: (value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value,
        },
      },
    },
  }

  const buildChartData = () => {
    const ctx = chartRef.current?.ctx
    const height = chartRef.current?.height || 250

    let revenueGradient
    let transactionsGradient
    
    if (ctx) {
      revenueGradient = ctx.createLinearGradient(0, 0, 0, height)
      revenueGradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)')
      revenueGradient.addColorStop(1, 'rgba(16, 185, 129, 0)')

      transactionsGradient = ctx.createLinearGradient(0, 0, 0, height)
      transactionsGradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)')
      transactionsGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
    }

    return {
      labels: data.map(d => d.month),
      datasets: [
        {
          label: 'Revenue',
          data: data.map(d => d.revenue),
          borderColor: '#10b981',
          backgroundColor: revenueGradient || 'rgba(16, 185, 129, 0.1)',
          borderWidth: 4,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#10b981',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 3,
          yAxisID: 'y',
          shadowOffsetX: 0,
          shadowOffsetY: 2,
          shadowBlur: 4,
          shadowColor: 'rgba(16, 185, 129, 0.3)',
        },
        {
          label: 'Transactions',
          data: data.map(d => d.transactions),
          borderColor: '#3b82f6',
          backgroundColor: transactionsGradient || 'rgba(59, 130, 246, 0.1)',
          borderWidth: 4,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#3b82f6',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 3,
          yAxisID: 'y1',
          shadowOffsetX: 0,
          shadowOffsetY: 2,
          shadowBlur: 4,
          shadowColor: 'rgba(59, 130, 246, 0.3)',
        },
      ],
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [])

  const ChartComponent = chartType === 'line' ? Line : Bar

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
          
          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-sm rounded ${
                chartType === 'line'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 text-sm rounded ${
                chartType === 'bar'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bar
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: '250px' }}>
        <ChartComponent
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
    </div>
  )
}

export default RevenueGrowthChart


