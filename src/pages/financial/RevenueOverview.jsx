import React from 'react'
import { DollarSign, TrendingUp, Users, BarChart3 } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import RevenueBySourceChart from './revenue_overview_widgets/RevenueBySourceChart'
import RevenueGrowthChart from './revenue_overview_widgets/RevenueGrowthChart'
import TopRevenueStreams from './revenue_overview_widgets/TopRevenueStreams'
import RecentTransactions from './revenue_overview_widgets/RecentTransactions'

const RevenueOverview = () => {

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Platform Revenue Overview</h1>
        <p className="text-sm md:text-base text-gray-600">Comprehensive revenue analytics and insights</p>
      </div>

      {/* Stats Cards - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard
          title="Total Platform Revenue"
          value="$2.4M"
          change="+12.5%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value="$456.8K"
          change="+8.3%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
        />
        <StatCard
          title="Average Revenue Per User"
          value="$45.67"
          change="+3.2%"
          changeType="up"
          icon={Users}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
        />
        <StatCard
          title="Revenue Growth Rate"
          value="15.4%"
          change="+2.1%"
          changeType="up"
          icon={BarChart3}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
        {/* Revenue by Source - 5 columns */}
        <div className="col-span-1 lg:col-span-5">
          <RevenueBySourceChart />
        </div>

        {/* Revenue Growth Chart - 7 columns */}
        <div className="col-span-1 lg:col-span-7">
          <RevenueGrowthChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Top Revenue Streams - 5 columns */}
        <div className="col-span-1 lg:col-span-5">
          <TopRevenueStreams />
        </div>

        {/* Recent Transactions - 7 columns */}
        <div className="col-span-1 lg:col-span-7">
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}

export default RevenueOverview

