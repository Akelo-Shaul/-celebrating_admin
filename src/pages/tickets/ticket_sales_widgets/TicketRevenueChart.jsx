import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
  Legend,
  Filler
)

const TicketRevenueChart = () => {
  const [activeTab, setActiveTab] = useState('revenue')
  const [chartType, setChartType] = useState('line')
  const [timeframe, setTimeframe] = useState('month')

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const revenueData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 49000, 63000, 58000, 72000, 68000, 75000, 82000, 88000, 92000, 98000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgb(34, 197, 94)',
        tension: 0.4,
        fill: false
      }
    ]
  }

  const ticketsSoldData = {
    labels,
    datasets: [
      {
        label: 'Tickets Sold',
        data: [2200, 2500, 2300, 3100, 2900, 3600, 3400, 3800, 4100, 4400, 4600, 4900],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgb(59, 130, 246)',
        tension: 0.4,
        fill: false
      }
    ]
  }

  const comparisonData = {
    labels,
    datasets: [
      {
        label: '2023',
        data: [35000, 42000, 39000, 53000, 48000, 62000, 58000, 65000, 72000, 78000, 82000, 88000],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgb(156, 163, 175)',
        tension: 0.4,
        fill: false
      },
      {
        label: '2024',
        data: [45000, 52000, 49000, 63000, 58000, 72000, 68000, 75000, 82000, 88000, 92000, 98000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgb(34, 197, 94)',
        tension: 0.4,
        fill: false
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            if (activeTab === 'revenue' || activeTab === 'comparison') {
              return '$' + value.toLocaleString()
            }
            return value.toLocaleString()
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  const getCurrentData = () => {
    switch (activeTab) {
      case 'revenue':
        return revenueData
      case 'tickets':
        return ticketsSoldData
      case 'comparison':
        return comparisonData
      default:
        return revenueData
    }
  }

  const ChartComponent = chartType === 'line' ? Line : Bar

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Sales Analytics</h2>
          
          <div className="flex items-center space-x-4">
            {/* Timeframe Selector */}
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>

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

        {/* Tabs */}
        <div className="flex items-center space-x-6 mt-4">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'revenue'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'tickets'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Tickets Sold
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'comparison'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Year Comparison
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div style={{ height: '350px' }}>
          <ChartComponent data={getCurrentData()} options={options} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-600 mb-1">Peak Sales</div>
            <div className="text-lg font-bold text-gray-900">$98,000</div>
            <div className="text-xs text-green-600">December</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Average</div>
            <div className="text-lg font-bold text-gray-900">$69,417</div>
            <div className="text-xs text-gray-500">Per month</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Growth Rate</div>
            <div className="text-lg font-bold text-green-600">+12.3%</div>
            <div className="text-xs text-gray-500">vs last year</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Total YTD</div>
            <div className="text-lg font-bold text-gray-900">$833,000</div>
            <div className="text-xs text-green-600">+18.2%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketRevenueChart

