import React, { useState, useRef, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export default function ProductsGrowth() {
  const chartRef = useRef(null)
  const [activeTimeframe, setActiveTimeframe] = useState('1m')

  // Sample data for different timeframes
  const timeframeData = {
    '1d': {
      labels: ['12am', '4am', '8am', '12pm', '4pm', '8pm'],
      data: [120, 145, 180, 220, 190, 210],
    },
    '1w': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [850, 920, 1050, 980, 1100, 1200, 1150],
    },
    '1m': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [4200, 4800, 5100, 5400],
    },
    '6m': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [18000, 19500, 21000, 22500, 24000, 25500],
    },
    '1Y': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [18000, 19500, 21000, 22500, 24000, 25500, 27000, 28500, 30000, 31500, 33000, 34500],
    },
  }

  const currentData = timeframeData[activeTimeframe]

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
        titleFont: { size: 13, weight: '500' },
        bodyFont: { size: 12 },
        padding: 10,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Products: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
          drawBorder: false,
        },
        ticks: {
          font: { size: 10 },
          color: '#6b7280',
          padding: 8,
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
          drawBorder: false,
        },
        ticks: {
          font: { size: 10 },
          color: '#6b7280',
          padding: 8,
          callback: (value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value,
        },
      },
    },
  }

  const buildChartData = () => {
    const ctx = chartRef.current?.ctx
    const height = chartRef.current?.height || 300

    let gradient
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
    }

    return {
      labels: currentData.labels,
      datasets: [
        {
          label: 'Products',
          data: currentData.data,
          borderColor: '#3b82f6',
          backgroundColor: gradient || 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#3b82f6',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
      ],
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [activeTimeframe])

  const timeframes = [
    { key: '1d', label: '1D' },
    { key: '1w', label: '1W' },
    { key: '1m', label: '1M' },
    { key: '6m', label: '6M' },
    { key: '1Y', label: '1Y' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Mobile Layout: 2 rows */}
      <div className="md:hidden space-y-3 mb-4">
        <div className="text-lg font-bold text-gray-900">Products Growth</div>
        <div className="flex items-center gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setActiveTimeframe(tf.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTimeframe === tf.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Layout: Single row */}
      <div className="hidden md:flex items-center justify-between mb-4">
        <div className="text-lg font-bold text-gray-900">Products Growth</div>
        <div className="flex items-center gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setActiveTimeframe(tf.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTimeframe === tf.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ height: '240px' }}>
        <Line
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
    </div>
  )
}
