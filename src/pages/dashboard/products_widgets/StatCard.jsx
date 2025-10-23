import React from 'react'

export default function StatCard({ title, value, delta }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-xl font-semibold text-gray-800 mt-2">{value}</div>
        </div>
        <div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">{delta}</div>
      </div>
    </div>
  )
}
