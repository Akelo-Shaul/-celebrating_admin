import React from 'react';
import { Calendar, CheckCircle, Clock, Ticket, DollarSign, CalendarCheck, TrendingUp, Target } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import RevenueOverviewChart from './event_analytics_widgets/RevenueOverviewChart';
import EventsByCategoriesChart from './event_analytics_widgets/EventsByCategoriesChart';
import AlertsList from './event_analytics_widgets/AlertsList';
import EventListTable from './event_analytics_widgets/EventListTable';

const EventAnalytics = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Analytics</h1>
        <p className="text-gray-600">Comprehensive analytics and insights for event management</p>
      </div>

      {/* Stats Cards Section - 3x3 Grid */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Events"
            value="1,450"
            change="+2.54%"
            changeType="up"
            icon={Calendar}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Active Events"
            value="483,456"
            change="+2.54%"
            changeType="up"
            icon={CheckCircle}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Pending Approval"
            value="43"
            icon={Clock}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          />
          <StatCard
            title="Tickets Sold"
            value="70.4K"
            change="+12.54%"
            changeType="up"
            icon={Ticket}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Revenue"
            value="$967,234"
            change="+12.54%"
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Upcoming Events"
            value="46"
            change="+12.54%"
            changeType="up"
            icon={CalendarCheck}
            iconBgColor="bg-indigo-100"
            iconColor="text-indigo-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
          <StatCard
            title="Events Today"
            value="134"
            change="+2.54%"
            changeType="up"
            icon={TrendingUp}
            iconBgColor="bg-cyan-100"
            iconColor="text-cyan-600"
            dropdown={{ options: ['Today', 'Yesterday'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Sold Out Events"
            value="39"
            change="+12.54%"
            changeType="up"
            icon={Target}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
            comparisonText="compared to last month"
          />
        </div>
      </div>

      {/* Middle Section - Charts and Alerts */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Revenue Overview Chart */}
          <div className="col-span-2">
            <RevenueOverviewChart />
          </div>
          
          {/* Right Side - Split into two sections */}
          <div className="col-span-1 space-y-6">
            <EventsByCategoriesChart />
            <AlertsList />
          </div>
        </div>
      </div>

      {/* Bottom Section - Event List Table */}
      <div className="mb-6">
        <EventListTable />
      </div>
    </div>
  );
};

export default EventAnalytics;





