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
import { TrendingUp, Users, MessageSquare, ThumbsUp } from 'lucide-react'

// Register ChartJS components
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

const StreamAnalyticsWidget = ({ stream }) => {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState('line')

  // Viewer data over time
  const viewerData = [
    { time: '9:00', viewers: 1200 },
    { time: '9:15', viewers: 3400 },
    { time: '9:30', viewers: 5600 },
    { time: '9:45', viewers: 7800 },
    { time: '10:00', viewers: 9200 },
    { time: '10:15', viewers: 11500 },
    { time: '10:30', viewers: 12500 },
    { time: '10:45', viewers: 11200 },
    { time: '11:00', viewers: 9800 },
    { time: '11:15', viewers: 8943 }
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
        titleFont: { size: 13, weight: '500' },
        bodyFont: { size: 12 },
        padding: 10,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Viewers: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: true,
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 8,
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 8,
          callback: (value) => `${value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}`,
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
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)')
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
    }

    return {
      labels: viewerData.map(d => d.time),
      datasets: [
        {
          label: 'Viewers',
          data: viewerData.map(d => d.viewers),
          borderColor: '#8B5CF6',
          backgroundColor: gradient || 'rgba(139, 92, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#8B5CF6',
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
  }, [viewerData])

  const analyticsStats = [
    {
      label: 'Avg Viewers',
      value: stream.averageViewers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Peak Viewers',
      value: stream.peakViewers.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Total Messages',
      value: stream.totalMessages.toLocaleString(),
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Likes',
      value: stream.likes.toLocaleString(),
      icon: ThumbsUp,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Stream Analytics</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {analyticsStats.map((stat, index) => (
          <div key={index} className={`p-3 rounded-lg ${stat.bgColor}`}>
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-gray-600">{stat.label}</span>
            </div>
            <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Viewer Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Viewer Count Over Time</h3>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-xs rounded ${
                chartType === 'line'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-2 py-1 text-xs rounded ${
                chartType === 'bar'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bar
            </button>
          </div>
        </div>
        <div style={{ height: '200px' }}>
          {React.createElement(chartType === 'line' ? Line : Bar, {
            ref: chartRef,
            options: options,
            data: buildChartData()
          })}
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{stream.sentiment}%</div>
          <div className="text-xs text-gray-600">Positive Sentiment</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{stream.uniqueViewers.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Unique Viewers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{stream.shares.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Shares</div>
        </div>
      </div>
    </div>
  )
}

export default StreamAnalyticsWidget

