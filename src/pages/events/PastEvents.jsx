import React from 'react';
import { CheckCircle, DollarSign, Users, Star } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import PastEventCard from './past_events_widgets/PastEventCard';

const PastEvents = () => {

  const pastEvents = [
    {
      id: 1,
      title: "Wall of Fame Nairobi carnivore lit",
      host: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        status: "Celebrity"
      },
      viewerCount: "74,243",
      viewersPerMinute: "1850/min",
      duration: "1hr 24m",
      sentiment: "94",
      tags: ["Music", "Paid"],
      attendance: {
        attended: 2400,
        total: 2500,
        percentage: "96"
      },
      revenue: "$36,987.76",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      status: "Completed"
    },
    {
      id: 2,
      title: "Wall of Fame Nairobi carnivore lit",
      host: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        status: "Celebrity"
      },
      viewerCount: "74,243",
      viewersPerMinute: "1850/min",
      duration: "1hr 24m",
      sentiment: "94",
      tags: ["Music", "Paid"],
      attendance: {
        attended: 2400,
        total: 2500,
        percentage: "96"
      },
      revenue: "$36,987.76",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      status: "Completed"
    },
    {
      id: 3,
      title: "Wall of Fame Nairobi carnivore lit",
      host: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        status: "Celebrity"
      },
      viewerCount: "74,243",
      viewersPerMinute: "1850/min",
      duration: "1hr 24m",
      sentiment: "94",
      tags: ["Music", "Paid"],
      attendance: {
        attended: 2400,
        total: 2500,
        percentage: "96"
      },
      revenue: "$36,987.76",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      status: "Completed"
    },
    {
      id: 4,
      title: "Wall of Fame Nairobi carnivore lit",
      host: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        status: "Celebrity"
      },
      viewerCount: "74,243",
      viewersPerMinute: "1850/min",
      duration: "1hr 24m",
      sentiment: "94",
      tags: ["Music", "Paid"],
      attendance: {
        attended: 2400,
        total: 2500,
        percentage: "96"
      },
      revenue: "$36,987.76",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      status: "Completed"
    },
    {
      id: 5,
      title: "Wall of Fame Nairobi carnivore lit",
      host: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        status: "Celebrity"
      },
      viewerCount: "74,243",
      viewersPerMinute: "1850/min",
      duration: "1hr 24m",
      sentiment: "94",
      tags: ["Music", "Paid"],
      attendance: {
        attended: 2400,
        total: 2500,
        percentage: "96"
      },
      revenue: "$36,987.76",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      status: "Completed"
    },
    {
      id: 6,
      title: "Wall of Fame Nairobi carnivore lit",
      host: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        status: "Celebrity"
      },
      viewerCount: "74,243",
      viewersPerMinute: "1850/min",
      duration: "1hr 24m",
      sentiment: "94",
      tags: ["Music", "Paid"],
      attendance: {
        attended: 2400,
        total: 2500,
        percentage: "96"
      },
      revenue: "$36,987.76",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      status: "Completed"
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Past Events List</h1>
        <p className="text-gray-600">Review and analyze completed events and their performance</p>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Completed"
            value="2,450"
            subtitle="all time"
            icon={CheckCircle}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Total Revenue"
            value="$1.3M"
            icon={DollarSign}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Avg Attendance"
            value="87.3%"
            subtitle="check in rate"
            icon={Users}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Summary Rating"
            value="4.5/5.0"
            subtitle="Customer Satisfaction"
            icon={Star}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>
      </div>

      {/* Past Events Section */}
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Header with Search */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Past Events List</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Event ..."
                  className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
                />
                <svg
                  className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <PastEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEvents;





