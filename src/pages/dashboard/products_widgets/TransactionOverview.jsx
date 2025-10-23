import React, { useRef, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function TransactionOverview() {
  const chartRef = useRef(null)

  // Transaction data matching the image
  const transactionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    deposits: [4000, 5500, 4800, 1600, 3800, 2100, 5300, 4500],
    withdrawals: [3100, 2200, 3600, 2600, 4700, 3500, 2300, 3200],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: '#374151',
          generateLabels: (chart) => {
            return [
              {
                text: 'Deposits',
                fillStyle: '#f87171',
                strokeStyle: '#f87171',
                lineWidth: 0,
                pointStyle: 'circle',
                hidden: false,
              },
              {
                text: 'Withdrawals',
                fillStyle: '#2dd4bf',
                strokeStyle: '#2dd4bf',
                lineWidth: 0,
                pointStyle: 'circle',
                hidden: false,
              },
            ]
          },
        },
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
          color: 'rgba(0,0,0,0.08)',
          drawBorder: true,
          borderColor: '#d1d5db',
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        max: 6000,
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.08)',
          drawBorder: true,
          borderColor: '#d1d5db',
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 8,
          stepSize: 1000,
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  }

  const data = {
    labels: transactionData.labels,
    datasets: [
      {
        label: 'Deposits',
        data: transactionData.deposits,
        backgroundColor: 'rgba(248, 113, 113, 0.8)',
        borderColor: '#f87171',
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: 'Withdrawals',
        data: transactionData.withdrawals,
        backgroundColor: 'rgba(45, 212, 191, 0.8)',
        borderColor: '#2dd4bf',
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Transaction Overview</h3>
      </div>
      <div style={{ height: '320px' }}>
        <Bar
          ref={chartRef}
          options={options}
          data={data}
        />
      </div>
    </div>
  )
}
