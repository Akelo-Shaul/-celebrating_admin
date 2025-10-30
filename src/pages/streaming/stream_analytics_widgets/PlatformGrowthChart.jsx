import React, { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)

const PlatformGrowthChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m')
  const [type, setType] = useState('line')

  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']
  const streams = [2000,2500,3000,2800,3200,3500,3800,4000]
  const revenue = [3000,3500,4000,3800,4200,4500,4800,5000]
  const viewers = [4500,5000,5500,5200,5800,6000,6200,6500]

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      { label: 'Streams', data: streams, backgroundColor: '#f97316', borderColor: '#f97316', tension: 0.3, borderWidth: 2 },
      { label: 'Revenue', data: revenue, backgroundColor: '#10b981', borderColor: '#10b981', tension: 0.3, borderWidth: 2 },
      { label: 'Viewers', data: viewers, backgroundColor: '#eab308', borderColor: '#eab308', tension: 0.3, borderWidth: 2 }
    ]
  }), [labels, streams, revenue, viewers])

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: '#374151' } }, tooltip: { mode: 'index', intersect: false } },
    interaction: { mode: 'nearest', intersect: false },
    scales: { x: { grid: { display: false }, ticks: { color: '#6b7280' } }, y: { beginAtZero: true, ticks: { color: '#6b7280' }, grid: { color: '#f3f4f6' } } }
  }), [])

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Platform Growth (6 Months)</h3>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {['1d', '1w', '1m', '6m', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-xs rounded ${
                  selectedPeriod === period
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <button onClick={() => setType('line')} className={`px-3 py-1 text-xs rounded ${type === 'line' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>Line</button>
            <button onClick={() => setType('bar')} className={`px-3 py-1 text-xs rounded ${type === 'bar' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>Bar</button>
          </div>
        </div>
      </div>

      <div style={{ height: '220px' }} className="mb-4">
        {type === 'line' ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>

      {/* Chart.js provides a legend already (position: 'bottom') — remove duplicate manual legend */}
    </div>
  )
}

export default PlatformGrowthChart;
