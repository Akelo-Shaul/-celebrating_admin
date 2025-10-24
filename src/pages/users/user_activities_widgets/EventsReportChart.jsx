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

export default function EventsReportChart() {
  const chartRef = useRef(null)

  const eventsData = [
    { month: 'Jan', events: 2000 },
    { month: 'Feb', events: 1500 },
    { month: 'Mar', events: 3000 },
    { month: 'Apr', events: 5000 },
    { month: 'May', events: 4500 },
    { month: 'Jun', events: 6000 },
    { month: 'Jul', events: 6200 },
    { month: 'Aug', events: 6500 },
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
        titleFont: { size: 12, weight: '500' },
        bodyFont: { size: 11 },
        padding: 8,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Events: ${context.parsed.y.toLocaleString()}`,
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

  const buildChartData = () => {
    const ctx = chartRef.current?.ctx
    const height = chartRef.current?.height || 200

    let gradient
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(241, 149, 52, 0.2)')
      gradient.addColorStop(1, 'rgba(241, 149, 52, 0)')
    }

    return {
      labels: eventsData.map(d => d.month),
      datasets: [
        {
          label: 'Events',
          data: eventsData.map(d => d.events),
          borderColor: '#F19534',
          backgroundColor: gradient || 'rgba(241, 149, 52, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
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
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-base font-bold text-gray-900 mb-3">Events Report</h3>
      <div style={{ height: '200px' }}>
        <Line
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
    </div>
  )
}



