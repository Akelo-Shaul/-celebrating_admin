import React from 'react'
import { Filter, Search } from 'lucide-react'

const ModerationFilters = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts, users, or keywords..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content Type Filter */}
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Types</option>
          <option>Celebration Post</option>
          <option>Comment</option>
          <option>Image</option>
          <option>Video</option>
          <option>Link</option>
        </select>

        {/* Status Filter */}
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Pending</option>
          <option>Flagged</option>
          <option>Auto-Blocked</option>
          <option>Under Review</option>
        </select>

        {/* Priority Filter */}
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        {/* Advanced Filters Button */}
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  )
}

export default ModerationFilters






