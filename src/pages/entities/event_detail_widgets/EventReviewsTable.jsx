import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'

const EventReviewsTable = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      content: "Can't believe this is how it is supposed to be and how about we just do it ...",
      timestamp: '28-02-2000',
      salutes: 50,
      rating: 3.5
    },
    {
      id: 2,
      content: "Can't believe this is how it is supposed to be and how about we just do it ...",
      timestamp: '28-02-2000',
      salutes: 50,
      rating: 3.5
    },
    {
      id: 3,
      content: "Can't believe this is how it is supposed to be and how about we just do it ...",
      timestamp: '28-02-2000',
      salutes: 50,
      rating: 3.5
    },
    {
      id: 4,
      content: "Can't believe this is how it is supposed to be and how about we just do it ...",
      timestamp: '28-02-2000',
      salutes: 50,
      rating: 3.5
    },
    {
      id: 5,
      content: "Can't believe this is how it is supposed to be and how about we just do it ...",
      timestamp: '28-02-2000',
      salutes: 50,
      rating: 3.5
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow h-full">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200">
        <div className="space-y-3">
          {/* Title and Filter Button Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-gray-900">Reviews</h2>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Search Bar Row */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Reviews ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Latest Reviews
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Salutes
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-800 line-clamp-2">{review.content}</div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className="text-sm text-gray-900">{review.timestamp}</span>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className="text-sm text-gray-900">{review.salutes}</span>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className="text-sm text-gray-900">{review.rating}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventReviewsTable

