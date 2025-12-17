import React from 'react'
import { Store, ShoppingBag, TrendingUp, DollarSign, Package, Users, Star, ShoppingCart } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import ShopPerformanceChart from './shop_analytics_widgets/ShopPerformanceChart'
import TopShopsTable from './shop_analytics_widgets/TopShopsTable'
import ShopCategoryDistribution from './shop_analytics_widgets/ShopCategoryDistribution'
import RevenueByShopChart from './shop_analytics_widgets/RevenueByShopChart'
import ShopGrowthTrend from './shop_analytics_widgets/ShopGrowthTrend'

const ShopAnalytics = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shop Analytics</h1>
        <p className="text-gray-600">Analyze shop performance metrics and trends</p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Shops"
          value="1,247"
          change="+8.2%"
          changeType="up"
          icon={Store}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Active Shops"
          value="892"
          change="+5.4%"
          changeType="up"
          icon={ShoppingBag}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Total Revenue"
          value="$2.4M"
          change="+12.3%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Total Orders"
          value="15,843"
          change="+15.7%"
          changeType="up"
          icon={ShoppingCart}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Total Products"
          value="8,456"
          change="+6.8%"
          changeType="up"
          icon={Package}
          iconBgColor="bg-cyan-100"
          iconColor="text-cyan-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Active Merchants"
          value="745"
          change="+4.2%"
          changeType="up"
          icon={Users}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Average Rating"
          value="4.6"
          change="+0.2"
          changeType="up"
          icon={Star}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Conversion Rate"
          value="3.8%"
          change="+0.5%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-rose-100"
          iconColor="text-rose-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Shop Growth Trend */}
      <div className="mb-6">
        <ShopGrowthTrend />
      </div>

      {/* Revenue and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueByShopChart />
        <ShopPerformanceChart />
      </div>

      {/* Category Distribution and Top Shops */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ShopCategoryDistribution />
        </div>
        <div className="lg:col-span-2">
          <TopShopsTable />
        </div>
      </div>
    </div>
  )
}

export default ShopAnalytics
