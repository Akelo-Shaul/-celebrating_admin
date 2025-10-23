import React from 'react'

export default function HeaderSearch({ placeholder = 'Search Celebrities...' }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-lg font-semibold">All Celebrities</div>
      <div className="flex items-center gap-2">
        <input placeholder={placeholder} className="rounded-full bg-gray-300 px-4 py-2 text-sm placeholder-gray-600" />
        <button className="px-3 py-2 bg-gray-300 rounded">Filter</button>
      </div>
    </div>
  )
}
