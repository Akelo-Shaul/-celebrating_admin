import React from 'react'
import StandardTable from '../../../components/common/StandardTable'

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
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Rating Distribution</h3>
      <StandardTable
        title="Distribution"
        columns={["Rating", "Count", "%"]}
        data={dist}
        showFilter={false}
        showSearch={false}
        renderRow={(item, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{item.rating}★</td>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{item.count.toLocaleString()}</td>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{((item.count / total) * 100).toFixed(1)}%</td>
          </tr>
        )}
      />
    </div>
  )
}

export default RatingDistributionTable
