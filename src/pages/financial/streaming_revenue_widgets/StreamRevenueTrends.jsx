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

const StreamRevenueTrends = () => {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState('line')

  const data = [
    { month: 'Jan', subscriptions: 38000, donations: 27500, superchat: 71500, total: 137000 },
    { month: 'Feb', subscriptions: 41000, donations: 29000, superchat: 76000, total: 146000 },
    { month: 'Mar', subscriptions: 43000, donations: 30500, superchat: 80000, total: 153500 },
    { month: 'Apr', subscriptions: 42000, donations: 30000, superchat: 78000, total: 150000 },
    { month: 'May', subscriptions: 45000, donations: 32000, superchat: 84000, total: 161000 },
    { month: 'Jun', subscriptions: 47000, donations: 34000, superchat: 87000, total: 168000 }
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

    const gradients = {
      subscriptions: ctx ? (() => {
        const g = ctx.createLinearGradient(0, 0, 0, height)
        g.addColorStop(0, 'rgba(59, 130, 246, 0.2)')
        g.addColorStop(1, 'rgba(59, 130, 246, 0)')
        return g
      })() : null,
      donations: ctx ? (() => {
        const g = ctx.createLinearGradient(0, 0, 0, height)
        g.addColorStop(0, 'rgba(236, 72, 153, 0.2)')
        g.addColorStop(1, 'rgba(236, 72, 153, 0)')
        return g
      })() : null,
      superchat: ctx ? (() => {
        const g = ctx.createLinearGradient(0, 0, 0, height)
        g.addColorStop(0, 'rgba(139, 92, 246, 0.2)')
        g.addColorStop(1, 'rgba(139, 92, 246, 0)')
        return g
      })() : null
    }

    return {
      labels: data.map(d => d.month),
      datasets: [
        {
          label: 'Subscriptions',
          data: data.map(d => d.subscriptions),
          borderColor: '#3b82f6',
          backgroundColor: chartType === 'line' ? (gradients.subscriptions || '#3b82f640') : '#3b82f680',
          borderWidth: 3,
          fill: chartType === 'line',
          tension: chartType === 'line' ? 0.4 : 0,
          pointRadius: chartType === 'line' ? 0 : 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#3b82f6',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2
        },
        {
          label: 'Donations',
          data: data.map(d => d.donations),
          borderColor: '#ec4899',
          backgroundColor: chartType === 'line' ? (gradients.donations || '#ec489940') : '#ec489980',
          borderWidth: 3,
          fill: chartType === 'line',
          tension: chartType === 'line' ? 0.4 : 0,
          pointRadius: chartType === 'line' ? 0 : 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#ec4899',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2
        },
        {
          label: 'Super Chat & Gifts',
          data: data.map(d => d.superchat),
          borderColor: '#8b5cf6',
          backgroundColor: chartType === 'line' ? (gradients.superchat || '#8b5cf640') : '#8b5cf680',
          borderWidth: 3,
          fill: chartType === 'line',
          tension: chartType === 'line' ? 0.4 : 0,
          pointRadius: chartType === 'line' ? 0 : 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#8b5cf6',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2
        }
      ]
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
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Streaming Revenue Trends</h3>
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

export default StreamRevenueTrends






