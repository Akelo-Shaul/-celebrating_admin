import React from 'react'
import { DollarSign, Ticket, FileText, Star } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import EventRevenueChart from './event_revenue_widgets/EventRevenueChart'
import TopEventsTable from './event_revenue_widgets/TopEventsTable'
import RevenueByCategoryChart from './event_revenue_widgets/RevenueByCategoryChart'

const EventRevenue = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Revenue</h1>
        <p className="text-gray-600">Revenue from event tickets and listings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Event Revenue"
          value="$360K"
          change="+22.4%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Ticket Sales Commission"
          value="$270K"
          subtitle="75% of event revenue"
          change="+20.1%"
          changeType="up"
          icon={Ticket}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Event Listing Fees"
          value="$54K"
          subtitle="15% of event revenue"
          change="+18.5%"
          changeType="up"
          icon={FileText}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Featured Placement"
          value="$36K"
          subtitle="10% of event revenue"
          change="+45.2%"
          changeType="up"
          icon={Star}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-5">
          <RevenueByCategoryChart />
        </div>
        <div className="col-span-7">
          <EventRevenueChart />
        </div>
      </div>

      {/* Table */}
      <div>
        <TopEventsTable />
      </div>
    </div>
  )
}

export default EventRevenue

