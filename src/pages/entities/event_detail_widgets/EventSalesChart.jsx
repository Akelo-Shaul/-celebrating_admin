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

const EventSalesChart = () => {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState('line')

  const salesData = [
    { date: 'Oct 10', sales: 20 },
    { date: 'Oct 11', sales: 25 },
    { date: 'Oct 12', sales: 30 },
    { date: 'Oct 13', sales: 40 },
    { date: 'Oct 14', sales: 45 },
    { date: 'Oct 15', sales: 50 },
    { date: 'Oct 16', sales: 55 },
    { date: 'Oct 17', sales: 60 }
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
          label: (context) => `Sales: ${context.parsed.y}`,
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
          stepSize: 10,
        },
        min: 0,
        max: 80,
      },
    },
  }

  const buildChartData = () => {
    const ctx = chartRef.current?.ctx
    const height = chartRef.current?.height || 300

    let gradient1, gradient2
    if (ctx) {
      gradient1 = ctx.createLinearGradient(0, 0, 0, height)
      gradient1.addColorStop(0, 'rgba(241, 149, 52, 0.3)')
      gradient1.addColorStop(0.5, 'rgba(241, 149, 52, 0.15)')
      gradient1.addColorStop(1, 'rgba(241, 149, 52, 0)')

      gradient2 = ctx.createLinearGradient(0, 0, 0, height)
      gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      gradient2.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)')
      gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)')
    }

    return {
      labels: salesData.map(d => d.date),
      datasets: [
        {
          label: 'Sales',
          data: salesData.map(d => d.sales),
          borderColor: '#F19534',
          backgroundColor: gradient1 || 'rgba(241, 149, 52, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#F19534',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
        {
          label: 'Revenue',
          data: salesData.map(d => d.sales + 10),
          borderColor: '#3B82F6',
          backgroundColor: gradient2 || 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#3B82F6',
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
  }, [salesData])

  const ChartComponent = chartType === 'line' ? Line : Bar

  return (
    <div className="bg-gray-200 rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Sales Report</h2>
        
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
      <div style={{ height: '350px' }}>
        <ChartComponent
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
    </div>
  )
}

export default EventSalesChart

