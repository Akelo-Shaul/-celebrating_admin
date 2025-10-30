import React from 'react'
import { TrendingUp, Eye, MousePointer, Share2 } from 'lucide-react'

const PromotionPerformance = () => {
  const metrics = [
    {
      label: 'Average Engagement Rate',
      value: '8.4%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Avg Impressions per Post',
      value: '16.3K',
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Avg Click-Through Rate',
      value: '4.2%',
      change: '+0.8%',
      trend: 'up',
      icon: MousePointer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Avg Share Rate',
      value: '2.1%',
      change: '+0.5%',
      trend: 'up',
      icon: Share2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const performanceData = [
    { range: '$50-$100', posts: 45, avgImpressions: '8.5K', avgEngagement: '5.2%', revenue: '$3,375' },
    { range: '$100-$200', posts: 58, avgImpressions: '15.2K', avgEngagement: '7.8%', revenue: '$8,700' },
    { range: '$200-$500', posts: 32, avgImpressions: '28.6K', avgEngagement: '9.4%', revenue: '$9,600' },
    { range: '$500+', posts: 12, avgImpressions: '45.3K', avgEngagement: '11.2%', revenue: '$8,175' }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Promotion Performance Metrics</h3>
      
      {/* Performance Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center mb-3`}> 
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-xs font-semibold text-green-600">{metric.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Performance by Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Performance by Price Range</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price Range</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Posts</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Avg Impressions</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Avg Engagement</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {performanceData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.range}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-center">{row.posts}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-center">{row.avgImpressions}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600 text-center">{row.avgEngagement}</td>
                  <td className="px-4 py-3 text-sm font-bold text-purple-600 text-right">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PromotionPerformance





