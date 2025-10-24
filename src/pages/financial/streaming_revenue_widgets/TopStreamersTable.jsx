import React from 'react'

const TopStreamersTable = () => {
  const streamers = [
    { name: 'DJ Kalonje', streams: 145, viewers: '125K', revenue: '$35,000', commission: '$7,000' },
    { name: 'Braum Halaberry', streams: 98, viewers: '85K', revenue: '$25,500', commission: '$5,100' },
    { name: 'Sarah Music', streams: 76, viewers: '62K', revenue: '$18,600', commission: '$3,720' },
    { name: 'Tech Guru', streams: 54, viewers: '45K', revenue: '$13,500', commission: '$2,700' },
    { name: 'Gaming Pro', streams: 42, viewers: '38K', revenue: '$11,400', commission: '$2,280' }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Top Streamers by Revenue</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Streamer</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Total Streams</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Total Viewers</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Revenue</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Platform Commission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {streamers.map((streamer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{streamer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{streamer.streams}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{streamer.viewers}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">{streamer.revenue}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">{streamer.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopStreamersTable



