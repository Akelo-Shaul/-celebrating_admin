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

const CommissionTrends = () => {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState('line')

  const data = [
    { month: 'Jan', electronics: 180000, fashion: 144000, home: 90000, beauty: 60000, sports: 35000 },
    { month: 'Feb', electronics: 195000, fashion: 156000, home: 97500, beauty: 65000, sports: 38000 },
    { month: 'Mar', electronics: 210000, fashion: 168000, home: 105000, beauty: 70000, sports: 41000 },
    { month: 'Apr', electronics: 205000, fashion: 164000, home: 102500, beauty: 68000, sports: 40000 },
    { month: 'May', electronics: 220000, fashion: 176000, home: 110000, beauty: 73000, sports: 43000 },
    { month: 'Jun', electronics: 230000, fashion: 184000, home: 115000, beauty: 76000, sports: 45000 }
  ]

  const categories = [
    { key: 'electronics', color: '#10b981', label: 'Electronics' },
    { key: 'fashion', color: '#3b82f6', label: 'Fashion' },
    { key: 'home', color: '#f59e0b', label: 'Home & Garden' },
    { key: 'beauty', color: '#ef4444', label: 'Beauty' },
    { key: 'sports', color: '#8b5cf6', label: 'Sports' }
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
          padding: 12,
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
    categories.forEach(cat => {
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, `${cat.color}40`)
        gradient.addColorStop(1, `${cat.color}00`)
        gradients[cat.key] = gradient
      }
    })

    return {
      labels: data.map(d => d.month),
      datasets: categories.map(cat => ({
        label: cat.label,
        data: data.map(d => d[cat.key]),
        borderColor: cat.color,
        backgroundColor: chartType === 'line' ? (gradients[cat.key] || cat.color + '40') : cat.color + '80',
        borderWidth: 3,
        fill: chartType === 'line',
        tension: chartType === 'line' ? 0.4 : 0,
        pointRadius: chartType === 'line' ? 0 : 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: cat.color,
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
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Commission Revenue Trends</h3>
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

export default CommissionTrends






