import React from 'react'

const TopEventsTable = () => {
  const events = [
    { name: 'Music Festival 2024', category: 'Music', tickets: 5420, revenue: '$270,000', commission: '$54,000' },
    { name: 'Tech Summit Kenya', category: 'Business', tickets: 2100, revenue: '$105,000', commission: '$21,000' },
    { name: 'Marathon Challenge', category: 'Sports', tickets: 3200, revenue: '$96,000', commission: '$19,200' },
    { name: 'Food & Wine Expo', category: 'Food', tickets: 1800, revenue: '$54,000', commission: '$10,800' },
    { name: 'Charity Gala Night', category: 'Charity', tickets: 950, revenue: '$47,500', commission: '$9,500' }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Top Revenue Events</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Event Name</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Tickets Sold</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Ticket Revenue</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Commission Earned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.name}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                    {event.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{event.tickets}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">{event.revenue}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">{event.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopEventsTable






