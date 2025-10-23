import React from 'react'

export default function SalesVolume() {
  const rows = [1200,1000,800,500]
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Sales Volume</div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button className="px-2 py-1 bg-gray-100 rounded">1d</button>
          <button className="px-2 py-1 bg-gray-100 rounded">1w</button>
          <button className="px-2 py-1 bg-gray-100 rounded">1m</button>
          <button className="px-2 py-1 bg-gray-100 rounded">6m</button>
          <button className="px-2 py-1 bg-gray-100 rounded">1Y</button>
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
