import React, { useRef, useEffect } from 'react'
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

const SalesReport = () => {
  const chartRef = useRef(null)

  // Sample sales data for shops
  const salesData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 19000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 25000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 30000 },
    { month: 'Jul', sales: 28000 },
    { month: 'Aug', sales: 32000 },
    { month: 'Sep', sales: 35000 },
    { month: 'Oct', sales: 38000 },
    { month: 'Nov', sales: 42000 },
    { month: 'Dec', sales: 45000 },
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
          label: (context) => `Sales: $${context.parsed.y.toLocaleString()}`,
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
          callback: (value) => `$${value >= 1000 ? `${value/1000}k` : value}`,
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
      gradient.addColorStop(0, 'rgba(241, 149, 52, 0.3)')
      gradient.addColorStop(0.5, 'rgba(241, 149, 52, 0.15)')
      gradient.addColorStop(1, 'rgba(241, 149, 52, 0)')
    }

    return {
      labels: salesData.map(d => d.month),
      datasets: [
        {
          label: 'Sales',
          data: salesData.map(d => d.sales),
          borderColor: '#F19534',
          backgroundColor: gradient || 'rgba(241, 149, 52, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#F19534',
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
  }, [])

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-900">Sales Report</h4>
        <select className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
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

export default SalesReport
