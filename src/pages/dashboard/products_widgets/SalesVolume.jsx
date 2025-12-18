import React, { useState } from 'react'

export default function SalesVolume() {
  const [activeTimeframe, setActiveTimeframe] = useState('1m')
  const rows = [1200,1000,800,500]

  const timeframes = [
    { key: '1d', label: '1d' },
    { key: '1w', label: '1w' },
    { key: '1m', label: '1m' },
    { key: '6m', label: '6m' },
    { key: '1Y', label: '1Y' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Mobile Layout: 2 rows */}
      <div className="md:hidden space-y-3 mb-3">
        <div className="text-sm font-medium">Sales Volume</div>
        <div className="flex items-center gap-2 text-xs">
          {timeframes.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setActiveTimeframe(tf.key)}
              className={`px-2 py-1 rounded transition-colors ${
                activeTimeframe === tf.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Layout: Single row */}
      <div className="hidden md:flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Sales Volume</div>
        <div className="flex items-center gap-2 text-xs">
          {timeframes.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setActiveTimeframe(tf.key)}
              className={`px-2 py-1 rounded transition-colors ${
                activeTimeframe === tf.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="flex-1 bg-yellow-300 h-6 rounded-lg" style={{ maxWidth: `${(r/1200)*100}%` }} />
            <div className="w-12 text-right font-medium">{r}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
