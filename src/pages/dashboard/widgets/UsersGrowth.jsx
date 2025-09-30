import React, { useState } from 'react'
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
import { usersGrowthData } from '../data/usersGrowthData'

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

// Simple plugin to add a glow/shadow effect while datasets are drawn
const glowPlugin = {
  id: 'glowPlugin',
  beforeDatasetsDraw: (chart) => {
    const ctx = chart.ctx
    // apply a gentle glow; will be visible on stroked lines
    ctx.save()
    ctx.shadowColor = 'rgba(124,58,237,0.9)'
    ctx.shadowBlur = 18
    ctx.globalCompositeOperation = 'lighter'
  },
  afterDatasetsDraw: (chart) => {
    chart.ctx.restore()
  }
}

ChartJS.register(glowPlugin)

const timeframeOptions = ['1d', '1w', '1m', '6m', '1y']

const UsersGrowth = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [timeframe, setTimeframe] = useState('1m')
  const chartRef = React.useRef(null)
  const timeContainerRef = React.useRef(null)
  const [pillStyle, setPillStyle] = React.useState({ left: 0, width: 0 })

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: false,
      callbacks: {
        label: (ctx) => `Value: ${ctx.parsed.y}`,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0b1220',
        titleColor: '#ffffff',
        bodyColor: '#e6e6e6',
        titleFont: { size: 13, weight: '500' },
        bodyFont: { size: 12 },
        padding: 10,
        borderColor: 'rgba(255,255,255,0.04)',
        borderWidth: 1,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(255,255,255,0.03)',
          drawBorder: false,
        },
        ticks: {
          font: { size: 10 },
          color: 'rgba(255,255,255,0.65)',
          padding: 8,
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(255,255,255,0.03)',
        },
        ticks: {
          font: { size: 10 },
          color: 'rgba(255,255,255,0.65)',
          padding: 8,
          callback: (value) => (value >= 1000 ? `${value/1000}K` : value),
        },
      },
    },
  }

  // Build the data used by the chart based on selected timeframe
  const buildData = React.useCallback(() => {
    const base = usersGrowthData[timeframe]
    if (!base) return { labels: [], datasets: [] }

  // clone datasets and attach gradient backgrounds if available
  // react-chartjs-2 may pass a wrapper; normalize to the underlying Chart instance/canvas
  const chartInstance = chartRef.current?.chart || chartRef.current
  const ctx = chartInstance?.ctx || chartInstance?.canvas?.getContext?.('2d') || null
  const width = chartInstance?.width || chartInstance?.canvas?.width || 400
  const height = chartInstance?.height || chartInstance?.canvas?.height || 200

    const datasets = base.datasets.map((ds, idx) => {
      const copy = { ...ds }
      // create vertical gradient with purple/indigo glow for first dataset
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, height)
        if (idx === 0) {
          grad.addColorStop(0, 'rgba(124,58,237,0.28)')
          grad.addColorStop(0.5, 'rgba(124,58,237,0.12)')
          grad.addColorStop(1, 'rgba(124,58,237,0)')
          copy.borderColor = copy.borderColor || '#7C3AED'
          copy.borderWidth = copy.borderWidth || 3
        } else {
          grad.addColorStop(0, 'rgba(59,130,246,0.22)')
          grad.addColorStop(1, 'rgba(59,130,246,0)')
          copy.borderColor = copy.borderColor || '#3B82F6'
          copy.borderWidth = copy.borderWidth || 2.5
        }
        copy.backgroundColor = grad
      }

      // make line a bit thicker and smooth
      copy.tension = copy.tension ?? 0.4
      copy.pointRadius = 0
      return copy
    })

    const filtered = datasets.filter(ds => activeFilter === 'All' || ds.label === activeFilter)
    return { labels: base.labels, datasets: filtered }
  }, [timeframe, activeFilter])

  // Force update the chart when timeframe/filters change so gradients are applied
  React.useEffect(() => {
    if (!chartRef.current) return
    try {
      chartRef.current.update()
    } catch (e) {
      // ignore
    }
  }, [timeframe, activeFilter, buildData])

  // Position the inner white pill under the selected timeframe option
  React.useEffect(() => {
    const measure = () => {
      const container = timeContainerRef.current
      if (!container) return
      const buttons = Array.from(container.querySelectorAll('button'))
      const idx = timeframeOptions.indexOf(timeframe)
      const target = buttons[idx]
      if (!target) return
  const rect = target.getBoundingClientRect()
  const parentRect = container.getBoundingClientRect()
  // small inset (4px) so the white pill doesn't touch button edges
  const left = rect.left - parentRect.left + 4
  const width = Math.max(32, target.offsetWidth - 8)
      setPillStyle({ left, width })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [timeframe])

  return (
    <div className="bg-[#0b1220] border border-transparent rounded-lg p-4 h-full flex flex-col text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Users</h2>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {['All', 'Celebrities', 'Members'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeFilter === filter
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative">
            <div ref={timeContainerRef} className="flex items-center gap-2 bg-[#b98383] rounded-full p-1 border-2 border-[#1266aa] relative">
              {timeframeOptions.map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-sm relative z-10 ${
                    timeframe === tf ? 'text-black font-semibold' : 'text-black/70'
                  }`}
                >
                  {tf}
                </button>
              ))}

              {/* moving inner white pill */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 4,
                  left: pillStyle.left,
                  width: pillStyle.width,
                  height: 28,
                  borderRadius: 9999,
                  background: '#ffffff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  transition: 'left 180ms ease, width 180ms ease',
                  zIndex: 5,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative h-full">
        {(() => {
          const data = buildData()
          // estimate width per point (px)
          return (
            <div className="w-full h-full">
              <div className="h-full">
                <div style={{ height: '100%' }}>
                  <Line
                    ref={(chart) => {
                      if (!chart) return
                      chartRef.current = chart
                    }}
                    options={options}
                    data={data}
                    style={{ height: '100%' }}
                  />
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

export default UsersGrowth