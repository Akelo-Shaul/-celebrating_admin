import React from 'react'
import { TrendingUp, Percent, Users, DollarSign } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import RevenueComparisonChart from './revenue_analytics_widgets/RevenueComparisonChart'
import RevenueHeatmap from './revenue_analytics_widgets/RevenueHeatmap'
import RevenueForecasting from './revenue_analytics_widgets/RevenueForecasting'

const RevenueAnalytics = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
        <p className="text-sm md:text-base text-gray-600">Advanced analytics and revenue forecasting</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard
          title="Total GMV (Gross Merchandise Value)"
          value="$12.4M"
          subtitle="total transaction volume"
          change="+18.5%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Platform Take Rate"
          value="19.4%"
          subtitle="average commission rate"
          change="+0.8%"
          changeType="up"
          icon={Percent}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Paying User Ratio"
          value="34.2%"
          subtitle="of total users"
          change="+2.3%"
          changeType="up"
          icon={Users}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Customer LTV"
          value="$487"
          subtitle="lifetime value per user"
          change="+12.7%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 mb-6">
        <RevenueComparisonChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-1 lg:col-span-7">
          <RevenueForecasting />
        </div>
        <div className="col-span-1 lg:col-span-5">
          <RevenueHeatmap />
        </div>
      </div>
    </div>
  )
}

export default RevenueAnalytics

