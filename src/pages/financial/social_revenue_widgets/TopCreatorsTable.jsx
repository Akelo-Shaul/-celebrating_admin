import React from 'react'

const TopCreatorsTable = () => {
  const creators = [
    { name: 'Braum Halaberry', posts: 245, gifts: '$45,000', badges: '$12,000', total: '$57,000' },
    { name: 'Sarah Influencer', posts: 198, gifts: '$38,000', badges: '$9,600', total: '$47,600' },
    { name: 'Music Star', posts: 156, gifts: '$31,200', badges: '$7,800', total: '$39,000' },
    { name: 'Tech Celebrity', posts: 134, gifts: '$26,800', badges: '$6,700', total: '$33,500' },
    { name: 'Fashion Icon', posts: 112, gifts: '$22,400', badges: '$5,600', total: '$28,000' }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Top Revenue Creators</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Creator</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Total Posts</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Gifts/Tips</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Badge Revenue</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {creators.map((creator, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{creator.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{creator.posts}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-right">{creator.gifts}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-right">{creator.badges}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">{creator.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopCreatorsTable




