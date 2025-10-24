import React from 'react'
import { TrendingUp } from 'lucide-react'

const TopPromotedPosts = () => {
  const topPosts = [
    {
      creator: 'Braum Halaberry',
      type: 'Celebrity',
      content: 'New Album Release Announcement',
      cost: '$500',
      impressions: '125K',
      engagement: '12.4%',
      revenue: '$500'
    },
    {
      creator: 'Fashion Icon',
      type: 'Celebrity',
      content: 'Fashion Week Collection Preview',
      cost: '$450',
      impressions: '98K',
      engagement: '10.8%',
      revenue: '$450'
    },
    {
      creator: 'Tech Guru',
      type: 'Celebrity',
      content: 'Product Launch Event',
      cost: '$350',
      impressions: '87K',
      engagement: '9.2%',
      revenue: '$350'
    },
    {
      creator: 'Mtumba Connect',
      type: 'Shop',
      content: 'Flash Sale - 50% Off',
      cost: '$300',
      impressions: '76K',
      engagement: '11.5%',
      revenue: '$300'
    },
    {
      creator: 'Music Star',
      type: 'Celebrity',
      content: 'Concert Tour Dates',
      cost: '$280',
      impressions: '65K',
      engagement: '8.9%',
      revenue: '$280'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Performing Promotions</h3>
        <TrendingUp className="w-5 h-5 text-green-600" />
      </div>
      
      <div className="space-y-4">
        {topPosts.map((post, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{post.creator}</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    {post.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{post.content}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-gray-500">Impressions</div>
                <div className="font-semibold text-gray-900">{post.impressions}</div>
              </div>
              <div>
                <div className="text-gray-500">Engagement</div>
                <div className="font-semibold text-green-600">{post.engagement}</div>
              </div>
              <div>
                <div className="text-gray-500">Cost</div>
                <div className="font-semibold text-purple-600">{post.cost}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopPromotedPosts




