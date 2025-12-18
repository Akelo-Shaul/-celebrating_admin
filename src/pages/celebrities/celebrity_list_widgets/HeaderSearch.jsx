import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'

export default function HeaderSearch({ placeholder = 'Search Celebrities...' }) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 md:px-6 py-3 md:py-4">
        {/* Mobile Layout: 2 rows */}
        <div className="md:hidden space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">All Celebrities</h2>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>

          {/* Bottom Row: Search Field (Full Width) */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Layout: Single row */}
        <div className="hidden md:flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">All Celebrities</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
              <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
