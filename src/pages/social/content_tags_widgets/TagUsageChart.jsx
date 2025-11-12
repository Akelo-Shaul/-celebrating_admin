import React from 'react'

const TagUsageChart = ({ data }) => {
  const items = data || [
    { tag: '#music', value: 54000 },
    { tag: '#art', value: 42000 },
    { tag: '#fashion', value: 28000 },
    { tag: '#design', value: 19000 },
  ]

  const max = Math.max(...items.map(i => i.value))

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Tag Usage</h3>
      </div>

      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">{it.tag}</span>
                <span className="text-sm text-gray-900">{it.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${(it.value / max) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagUsageChart
