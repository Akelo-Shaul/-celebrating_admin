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

const PeakHoursChart = () => {
  const [type, setType] = useState('line')

  const labels = ['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00']
  const streams = [1000,800,1200,2000,3000,3500,4000,3800]
  const viewers = [20000,15000,25000,40000,55000,60000,65000,62000]

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      { label: 'Streams', data: streams, backgroundColor: '#f97316', borderColor: '#f97316', tension: 0.3, borderWidth: 2, yAxisID: 'y' },
      { label: 'Viewers', data: viewers, backgroundColor: '#10b981', borderColor: '#10b981', tension: 0.3, borderWidth: 2, yAxisID: 'y' }
    ]
  }), [labels, streams, viewers])

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: '#374151' } }, tooltip: { mode: 'index', intersect: false } },
    interaction: { mode: 'nearest', intersect: false },
    scales: { x: { grid: { display: false }, ticks: { color: '#6b7280' } }, y: { beginAtZero: true, ticks: { color: '#6b7280' }, grid: { color: '#f3f4f6' } } }
  }), [])

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Peak Hours</h3>
          <p className="text-sm text-gray-500">Streams and viewers by time of day</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setType('line')} className={`px-3 py-1 text-xs rounded ${type === 'line' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>Line</button>
          <button onClick={() => setType('bar')} className={`px-3 py-1 text-xs rounded ${type === 'bar' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>Bar</button>
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

export default PeakHoursChart;
