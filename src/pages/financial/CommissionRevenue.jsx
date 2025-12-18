import React from 'react'
import { DollarSign, Store, ShoppingCart, Percent } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import CommissionBreakdownChart from './commission_revenue_widgets/CommissionBreakdownChart'
import TopShopsTable from './commission_revenue_widgets/TopShopsTable'
import CommissionTrends from './commission_revenue_widgets/CommissionTrends'

const CommissionRevenue = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Commission Revenue (Marketplace)</h1>
        <p className="text-sm md:text-base text-gray-600">Revenue from shop sales commissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard
          title="Total Commission Revenue"
          value="$600K"
          change="+15.3%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Active Shops"
          value="1,245"
          subtitle="generating revenue"
          change="+8.7%"
          changeType="up"
          icon={Store}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Total Transactions"
          value="24,567"
          subtitle="this month"
          change="+12.1%"
          changeType="up"
          icon={ShoppingCart}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Average Commission Rate"
          value="18.5%"
          subtitle="across all shops"
          change="+0.5%"
          changeType="up"
          icon={Percent}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
        <div className="col-span-1 lg:col-span-5">
          <CommissionBreakdownChart />
        </div>
        <div className="col-span-1 lg:col-span-7">
          <CommissionTrends />
        </div>
      </div>

      {/* Table */}
      <div>
        <TopShopsTable />
      </div>
    </div>
  )
}

export default CommissionRevenue

