import React from 'react'

const RatingDistributionTable = ({ distribution }) => {
  // default distribution: counts for 5..1 stars
  const dist = distribution || [
    { rating: 5, count: 680000 },
    { rating: 4, count: 310000 },
    { rating: 3, count: 120000 },
    { rating: 2, count: 30000 },
    { rating: 1, count: 48000 },
  ]

  const total = dist.reduce((s, d) => s + d.count, 0)

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 border border-gray-200">
      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Rating Distribution</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dist.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900">
                  {item.rating}★
                </td>
                <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-700">
                  {item.count.toLocaleString()}
                </td>
                <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-700">
                  {((item.count / total) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RatingDistributionTable
