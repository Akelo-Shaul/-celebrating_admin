import React from 'react'
import { DollarSign, Gift, BadgeCheck, TrendingUp } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import SocialRevenueBreakdownChart from './social_revenue_widgets/SocialRevenueBreakdownChart'
import TopCreatorsTable from './social_revenue_widgets/TopCreatorsTable'
import SocialRevenueTrends from './social_revenue_widgets/SocialRevenueTrends'

const SocialRevenue = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Social Revenue</h1>
        <p className="text-gray-600">Revenue from social features, gifts, and premium services</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Social Revenue"
          value="$312K"
          change="+14.2%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Gifts & Tips"
          value="$240K"
          subtitle="77% of social revenue"
          change="+12.8%"
          changeType="up"
          icon={Gift}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Verified Badges"
          value="$48K"
          subtitle="15% of social revenue"
          change="+25.3%"
          changeType="up"
          icon={BadgeCheck}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Promoted Posts"
          value="$24K"
          subtitle="8% of social revenue"
          change="+8.1%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-5">
          <SocialRevenueBreakdownChart />
        </div>
        <div className="col-span-7">
          <SocialRevenueTrends />
        </div>
      </div>

      {/* Table */}
      <div>
        <TopCreatorsTable />
      </div>
    </div>
  )
}

export default SocialRevenue

