import React from 'react';
import { CalendarCheck, Calendar, DollarSign, Ticket } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import UpcomingEventsTable from './upcoming_events_widgets/UpcomingEventsTable';

const UpcomingEvents = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
        <p className="text-sm md:text-base text-gray-600">Manage and monitor upcoming events and ticket availability</p>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-4 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatCard
            title="Total Upcoming This Month"
            value="450"
            change="+2.54%"
            changeType="up"
            icon={CalendarCheck}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            comparisonText="compared to last month"
          />
          <StatCard
            title="This Week Events"
            value="43"
            change="+2.54%"
            changeType="up"
            icon={Calendar}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            comparisonText="compared to last week"
          />
          <StatCard
            title="Expected Revenue"
            value="$345,764"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Ticket Available"
            value="32,535"
            subtitle="across all events"
            icon={Ticket}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>
      </div>

      {/* Event List Table */}
      <div className="mb-4 md:mb-6">
        <UpcomingEventsTable />
      </div>
    </div>
  );
};

export default UpcomingEvents;





