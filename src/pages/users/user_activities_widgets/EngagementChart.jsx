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

export default function EngagementChart() {
  const chartRef = useRef(null)

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    salutes: [2000, 1500, 3000, 3500, 3000, 4500, 5000, 5500],
    comments: [4000, 3000, 2500, 2000, 2500, 3000, 3500, 4000],
    recelebrations: [3000, 2500, 4000, 4500, 5000, 5500, 5800, 6000],
  }

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
          pointStyle: 'rect',
          padding: 12,
          font: { size: 11 },
          color: '#374151',
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb',
        titleFont: { size: 12, weight: '500' },
        bodyFont: { size: 11 },
        padding: 8,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || ''
            const value = context.parsed.y
            return `${label}: ${value.toLocaleString()}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
          drawBorder: true,
        },
        ticks: {
          font: { size: 10 },
          color: '#374151',
          padding: 6,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          font: { size: 10 },
          color: '#374151',
          padding: 6,
          callback: (value) => value >= 1000 ? `${value/1000}k` : value,
        },
      },
    },
  }

  const data = {
    labels: engagementData.labels,
    datasets: [
      {
        label: 'Salutes',
        data: engagementData.salutes,
        borderColor: '#F19534',
        backgroundColor: 'rgba(241, 149, 52, 0)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#F19534',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Comments',
        data: engagementData.comments,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#22c55e',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'ReCelebrations',
        data: engagementData.recelebrations,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#3b82f6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-base font-bold text-gray-900 mb-3">Salute, Comments & ReCelebrations Count</h3>
      <div style={{ height: '200px' }}>
        <Line
          ref={chartRef}
          options={options}
          data={data}
        />
      </div>
    </div>
  )
}


