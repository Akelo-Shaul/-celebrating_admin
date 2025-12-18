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

const RevenueComparisonChart = () => {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState('line')

  const data = [
    { month: 'Jan', fees: 960000, commission: 540000, events: 270000, streaming: 137000, social: 238240, promotions: 18500 },
    { month: 'Feb', fees: 975000, commission: 585000, events: 292500, streaming: 146000, social: 257400, promotions: 19800 },
    { month: 'Mar', fees: 990000, commission: 630000, events: 315000, streaming: 153500, social: 276120, promotions: 21200 },
    { month: 'Apr', fees: 985000, commission: 615000, events: 303750, streaming: 150000, social: 267540, promotions: 20500 },
    { month: 'May', fees: 1010000, commission: 660000, events: 337500, streaming: 161000, social: 296400, promotions: 22800 },
    { month: 'Jun', fees: 1020000, commission: 690000, events: 360000, streaming: 168000, social: 312000, promotions: 24850 }
  ]

  const revenueStreams = [
    { key: 'fees', color: '#10b981', label: 'Transaction Fees' },
    { key: 'commission', color: '#3b82f6', label: 'Commissions' },
    { key: 'events', color: '#f59e0b', label: 'Events' },
    { key: 'streaming', color: '#8b5cf6', label: 'Streaming' },
    { key: 'social', color: '#ec4899', label: 'Social' },
    { key: 'promotions', color: '#f97316', label: 'Promotions' }
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
    const height = chartRef.current?.height || 300

    const gradients = {}
    revenueStreams.forEach(stream => {
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, `${stream.color}40`)
        gradient.addColorStop(1, `${stream.color}00`)
        gradients[stream.key] = gradient
      }
    })

    return {
      labels: data.map(d => d.month),
      datasets: revenueStreams.map(stream => ({
        label: stream.label,
        data: data.map(d => d[stream.key]),
        borderColor: stream.color,
        backgroundColor: chartType === 'line' ? (gradients[stream.key] || stream.color + '40') : stream.color + '80',
        borderWidth: 3,
        fill: chartType === 'line',
        tension: chartType === 'line' ? 0.4 : 0,
        pointRadius: chartType === 'line' ? 0 : 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: stream.color,
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
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Revenue Stream Comparison</h3>
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

      <div style={{ height: '280px' }}>
        <ChartComponent
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
    </div>
  )
}

export default RevenueComparisonChart






