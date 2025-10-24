import React from 'react'

export default function LocationDistribution() {
  const rows = Array.from({ length: 6 }).map(() => ({ country: 'Kenya', value: '42.3K' }))
  return (
    <div className="bg-white rounded-lg p-4 h-full border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Location Distribution</div>
        <div className="text-xs">10</div>
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <div className="flex items-center gap-2">
              <img src="/favicon.png" alt="flag" className="w-6 h-6 rounded-full" />
              <div className="text-sm text-gray-800">{r.country}</div>
            </div>
            <div className="text-sm text-gray-700">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
