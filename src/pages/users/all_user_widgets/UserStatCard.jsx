import React from 'react'

export default function UserStatCard({ title, value, subtitle, delta }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-2xl font-semibold text-gray-900 mt-2">{value} <span className="text-sm text-gray-600">{subtitle}</span></div>
        </div>
        {delta && <div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">+{delta}%</div>}
      </div>
    </div>
  )
}
