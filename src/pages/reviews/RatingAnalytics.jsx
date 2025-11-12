import React from 'react'
import { Star, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import StandardTable from '../../components/common/StandardTable'
import RatingTrend from './rating_analytics_widgets/RatingTrend'
import RatingDistributionTable from './rating_analytics_widgets/RatingDistributionTable'

const RatingAnalytics = () => {
  // Sample / placeholder data — replace with real API data when available
  const avgRating = 4.3
  const totalReviews = '1.2M'
  const fiveStarPct = '56%'
  const oneStarPct = '4%'

  const topEntities = [
    { id: 1, name: 'Celebrity A', avg: 4.9, reviews: 12450 },
    { id: 2, name: 'Store X', avg: 4.8, reviews: 8740 },
    { id: 3, name: 'Product Z', avg: 4.7, reviews: 6720 },
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rating Analytics</h1>
        <p className="text-gray-600">Overview of rating trends, distribution and top-rated entities</p>
      </div>

      {/* Summary Stat Cards */}
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Average Rating"
            value={avgRating}
            subtitle="Platform average"
            icon={Star}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            comparisonText="compared to last month"
          />

          <StatCard
            title="Total Reviews"
            value={totalReviews}
            subtitle="All time"
            icon={MessageCircle}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />

          <StatCard
            title="5★ Percentage"
            value={fiveStarPct}
            subtitle="Share of five-star ratings"
            icon={ThumbsUp}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />

          <StatCard
            title="1★ Percentage"
            value={oneStarPct}
            subtitle="Share of one-star ratings"
            icon={ThumbsDown}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
          />
        </div>
      </div>

      {/* Main content: trend + distribution + top list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left area: two stacked cards - Trend and Top Rated list */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rating Trend</h2>
            <RatingTrend />
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">Top Rated Entities</h3>
            <StandardTable
              title="Top Rated"
              columns={["Name", "Avg Rating", "# Reviews"]}
              data={topEntities}
              renderRow={(item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.avg}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.reviews.toLocaleString()}</td>
                </tr>
              )}
            />
          </div>
        </div>

        {/* Right area: distribution widget */}
        <div className="col-span-1">
          <RatingDistributionTable />
        </div>
      </div>
    </div>
  )
}

export default RatingAnalytics
