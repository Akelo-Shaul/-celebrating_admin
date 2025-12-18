import React from 'react'
import { DollarSign, Users, Heart, Gift } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import StreamRevenueBreakdownChart from './streaming_revenue_widgets/StreamRevenueBreakdownChart'
import TopStreamersTable from './streaming_revenue_widgets/TopStreamersTable'
import StreamRevenueTrends from './streaming_revenue_widgets/StreamRevenueTrends'

const StreamingRevenue = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Live Streaming Revenue</h1>
        <p className="text-sm md:text-base text-gray-600">Revenue from subscriptions, donations, and super chats</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard
          title="Total Streaming Revenue"
          value="$168K"
          change="+18.7%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Subscription Revenue"
          value="$47K"
          subtitle="28% of streaming revenue"
          change="+12.3%"
          changeType="up"
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Donation Revenue"
          value="$34K"
          subtitle="20% of streaming revenue"
          change="+25.6%"
          changeType="up"
          icon={Heart}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Super Chat & Gifts"
          value="$87K"
          subtitle="52% of streaming revenue"
          change="+15.8%"
          changeType="up"
          icon={Gift}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
        <div className="col-span-1 lg:col-span-5">
          <StreamRevenueBreakdownChart />
        </div>
        <div className="col-span-1 lg:col-span-7">
          <StreamRevenueTrends />
        </div>
      </div>

      {/* Table */}
      <div>
        <TopStreamersTable />
      </div>
    </div>
  )
}

export default StreamingRevenue

