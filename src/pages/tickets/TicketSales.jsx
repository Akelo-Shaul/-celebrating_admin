import React from 'react'
import { Ticket, DollarSign, TrendingUp, Users, Calendar, Target } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TicketSalesTable from './ticket_sales_widgets/TicketSalesTable'
import TicketRevenueChart from './ticket_sales_widgets/TicketRevenueChart'
import TicketDistributionWidget from './ticket_sales_widgets/TicketDistributionWidget'
import TopSellingEventsWidget from './ticket_sales_widgets/TopSellingEventsWidget'

const TicketSales = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Ticket Sales</h1>
        <p className="text-sm md:text-base text-gray-600">Monitor and manage ticket sales across all events</p>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-4 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatCard
            title="Total Tickets Sold"
            value="45,632"
            change="+12.54%"
            changeType="up"
            icon={Ticket}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Total Revenue"
            value="$967,234"
            change="+18.32%"
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Avg Ticket Price"
            value="$21.20"
            change="+5.4%"
            changeType="up"
            icon={TrendingUp}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Active Events"
            value="156"
            change="+8.2%"
            changeType="up"
            icon={Calendar}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 mb-4 md:mb-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-8 space-y-3 md:space-y-6">
          <TicketRevenueChart />
          <TicketSalesTable />
        </div>

        {/* Right Column - Widgets */}
        <div className="lg:col-span-4 space-y-3 md:space-y-6">
          <TicketDistributionWidget />
          <TopSellingEventsWidget />
        </div>
      </div>
    </div>
  )
}

export default TicketSales

