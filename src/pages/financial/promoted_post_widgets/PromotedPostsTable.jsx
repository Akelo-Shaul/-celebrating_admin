import React from 'react'

const PromotedPostsTable = () => {
  const posts = [
    {
      id: 'PP-5678',
      creator: 'Braum Halaberry',
      type: 'Celebrity',
      content: 'New Album Release Announcement',
      duration: '7 Days',
      cost: '$500',
      impressions: '125K',
      clicks: '5.2K',
      engagement: '12.4%',
      status: 'active',
      startDate: '2024-06-15',
      endDate: '2024-06-22'
    },
    {
      id: 'PP-5677',
      creator: 'Fashion Icon',
      type: 'Celebrity',
      content: 'Fashion Week Collection Preview',
      duration: '3 Days',
      cost: '$450',
      impressions: '98K',
      clicks: '4.1K',
      engagement: '10.8%',
      status: 'active',
      startDate: '2024-06-18',
      endDate: '2024-06-21'
    },
    {
      id: 'PP-5676',
      creator: 'Tech Guru',
      type: 'Celebrity',
      content: 'Product Launch Event',
      duration: '24 Hours',
      cost: '$350',
      impressions: '87K',
      clicks: '3.5K',
      engagement: '9.2%',
      status: 'completed',
      startDate: '2024-06-17',
      endDate: '2024-06-18'
    },
    {
      id: 'PP-5675',
      creator: 'Mtumba Connect',
      type: 'Shop',
      content: 'Flash Sale - 50% Off',
      duration: '24 Hours',
      cost: '$300',
      impressions: '76K',
      clicks: '4.3K',
      engagement: '11.5%',
      status: 'completed',
      startDate: '2024-06-16',
      endDate: '2024-06-17'
    },
    {
      id: 'PP-5674',
      creator: 'Music Star',
      type: 'Celebrity',
      content: 'Concert Tour Dates',
      duration: '14 Days',
      cost: '$280',
      impressions: '65K',
      clicks: '2.8K',
      engagement: '8.9%',
      status: 'active',
      startDate: '2024-06-10',
      endDate: '2024-06-24'
    },
    {
      id: 'PP-5673',
      creator: 'Urban Threads',
      type: 'Shop',
      content: 'New Collection Launch',
      duration: '3 Days',
      cost: '$250',
      impressions: '58K',
      clicks: '2.5K',
      engagement: '9.8%',
      status: 'completed',
      startDate: '2024-06-14',
      endDate: '2024-06-17'
    },
    {
      id: 'PP-5672',
      creator: 'Sarah Influencer',
      type: 'Celebrity',
      content: 'Brand Partnership Announcement',
      duration: '7 Days',
      cost: '$220',
      impressions: '52K',
      clicks: '2.1K',
      engagement: '7.8%',
      status: 'active',
      startDate: '2024-06-12',
      endDate: '2024-06-19'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">All Promoted Posts</h3>
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Scheduled</option>
            </select>
            <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All Types</option>
              <option>Celebrity</option>
              <option>Shop</option>
              <option>User</option>
            </select>
            <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Creator</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Content</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Duration</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Impressions</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Clicks</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Engagement</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Cost</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{post.creator}</div>
                    <div className="text-xs text-gray-500">{post.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{post.content}</div>
                  <div className="text-xs text-gray-500">{post.startDate} - {post.endDate}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{post.duration}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-center">{post.impressions}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{post.clicks}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600 text-center">{post.engagement}</td>
                <td className="px-6 py-4 text-sm font-bold text-purple-600 text-right">{post.cost}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    post.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PromotedPostsTable





