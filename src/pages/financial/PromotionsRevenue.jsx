import React from 'react'
import { DollarSign, TrendingUp, DollarSignIcon as DollarAvg, Eye } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import PromotedPostsTable from './promoted_post_widgets/PromotedPostsTable'
import RevenueByDuration from './promoted_post_widgets/RevenueByDuration'
import RevenueTrends from './promoted_post_widgets/RevenueTrends'
import TopPromotedPosts from './promoted_post_widgets/TopPromotedPosts'
import PromotionPerformance from './promoted_post_widgets/PromotionPerformance'

const PromotionsRevenue = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Promotions Revenue</h1>
        <p className="text-gray-600">Revenue analytics from promotions and sponsored content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Promotion Revenue"
          value="$24,850"
          change="+18.4%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Active Promotions"
          value="147"
          subtitle="currently running"
          change="+12.3%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Average Promotion Cost"
          value="$169"
          subtitle="per promotion"
          change="+5.2%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Total Impressions"
          value="2.4M"
          subtitle="from promoted posts"
          change="+22.7%"
          changeType="up"
          icon={Eye}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-5">
          <RevenueByDuration />
        </div>
        <div className="col-span-7">
          <RevenueTrends />
        </div>
      </div>

      {/* Performance and Top Posts */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-7">
          <PromotionPerformance />
        </div>
        <div className="col-span-5">
          <TopPromotedPosts />
        </div>
      </div>

      {/* Detailed Table */}
      <div>
        <PromotedPostsTable />
      </div>
    </div>
  )
}

export default PromotionsRevenue

