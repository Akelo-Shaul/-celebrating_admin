import React, { useRef, useEffect } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const RoleDistributionChart = () => {
  const chartRef = useRef(null)

  const roleData = {
    'Member': 111234,
    'Shop Owner': 67890,
    'Celebrity': 45230,
    'Moderator': 156,
    'Admin': 19,
    'Super Admin': 5,
    'Support Agent': 45,
    'Guest': 0
  }

  const colors = [
    '#9CA3AF', // Gray - Member
    '#10B981', // Green - Shop Owner
    '#A855F7', // Purple - Celebrity
    '#3B82F6', // Blue - Moderator
    '#F97316', // Orange - Admin
    '#EF4444', // Red - Super Admin
    '#6366F1', // Indigo - Support Agent
    '#FBBF24'  // Yellow - Guest
  ]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 11
          },
          usePointStyle: true,
          pointStyle: 'circle'
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
            const label = context.label || ''
            const value = context.parsed || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value.toLocaleString()} (${percentage}%)`
          }
        }
      }
    }
  }

  const buildChartData = () => {
    const labels = Object.keys(roleData)
    const data = Object.values(roleData)
    const backgroundColors = colors.slice(0, labels.length)

    return {
      labels: labels,
      datasets: [
        {
          label: 'Users',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Role Distribution</h3>
      <div style={{ height: '300px' }}>
        <Doughnut
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
      
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Total Users</div>
            <div className="text-lg font-bold text-gray-900">
              {Object.values(roleData).reduce((a, b) => a + b, 0).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Active Roles</div>
            <div className="text-lg font-bold text-gray-900">
              {Object.keys(roleData).filter(key => roleData[key] > 0).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleDistributionChart

