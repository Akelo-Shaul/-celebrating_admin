import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Users, Calendar, TrendingUp, Clock, Eye, Timer, Award, DollarSign, MessageSquare } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import StreamCard from './active_streams_widgets/StreamCard';
import AlertsSidebar from './active_streams_widgets/AlertsSidebar';

const ActiveStreams = () => {
  const navigate = useNavigate();
  const [streams, setStreams] = useState([
    {
      id: 1,
      title: 'Wall of Fame Nairobi carnivore lit',
      streamer: {
        name: 'Braum Hallabery',
        handle: '@braum',
        avatar: 'B',
        status: 'Celebrity'
      },
      viewerCount: '74,243',
      viewersPerMinute: '1850/min',
      duration: '1hr 24m',
      sentiment: '94',
      tags: ['Music', 'Paid'],
      revenue: '$34.8K',
      health: '98',
      retention: '84',
      resolution: '1080p, 60fps'
    },
    {
      id: 2,
      title: 'Wall of Fame Nairobi carnivore lit',
      streamer: {
        name: 'Braum Hallabery',
        handle: '@braum',
        avatar: 'B',
        status: 'Celebrity'
      },
      viewerCount: '74,243',
      viewersPerMinute: '1850/min',
      duration: '1hr 24m',
      sentiment: '94',
      tags: ['Music', 'Paid'],
      revenue: '3 Flags',
      health: '98',
      retention: '84',
      resolution: '1080p, 60fps'
    },
    {
      id: 3,
      title: 'Wall of Fame Nairobi carnivore lit',
      streamer: {
        name: 'Braum Hallabery',
        handle: '@braum',
        avatar: 'B',
        status: 'Celebrity'
      },
      viewerCount: '74,243',
      viewersPerMinute: '1850/min',
      duration: '1hr 24m',
      sentiment: '94',
      tags: ['Music', 'Paid'],
      revenue: '$34.8K',
      health: '98',
      retention: '84',
      resolution: '1080p, 60fps'
    },
    {
      id: 4,
      title: 'Wall of Fame Nairobi carnivore lit',
      streamer: {
        name: 'Braum Hallabery',
        handle: '@braum',
        avatar: 'B',
        status: 'Celebrity'
      },
      viewerCount: '74,243',
      viewersPerMinute: '1850/min',
      duration: '1hr 24m',
      sentiment: '94',
      tags: ['Music', 'Paid'],
      revenue: '$34.8K',
      health: '98',
      retention: '84',
      resolution: '1080p, 60fps'
    }
  ]);

  const stats = [
    {
      title: "Live Now",
      value: "150",
      change: "+2.54%",
      changeType: "up",
      icon: Radio,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
      dropdown: { options: ['Today', 'This Hour', 'Last Hour'], defaultValue: 'Today' },
      comparisonText: "compared to last hour"
    },
    {
      title: "Concurrent Viewers",
      value: "483,456",
      change: "+2.54%",
      changeType: "up",
      icon: Users,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      dropdown: { options: ['Today', 'This Hour', 'Last Hour'], defaultValue: 'Today' },
      comparisonText: "compared to last hour"
    },
    {
      title: "Scheduled Streams",
      value: "43",
      icon: Calendar,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      dropdown: { options: ['Today', 'This Week', 'This Month'], defaultValue: 'Today' }
    },
    {
      title: "Streams Today",
      value: "562",
      change: "+2.54%",
      changeType: "up",
      icon: TrendingUp,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      dropdown: { options: ['Today', 'Yesterday'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    },
    {
      title: "Watch Time",
      value: "20.4K hrs",
      change: "+12.54%",
      changeType: "up",
      icon: Clock,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      dropdown: { options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    },
    {
      title: "Peak Viewers",
      value: "567,234",
      change: "+12.54%",
      changeType: "up",
      icon: Eye,
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      dropdown: { options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    },
    {
      title: "Avg Stream Duration",
      value: "70 mins",
      change: "+12.54%",
      changeType: "up",
      icon: Timer,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      dropdown: { options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    },
    {
      title: "Celebrity Streams",
      value: "350",
      change: "+12.54%",
      changeType: "up",
      icon: Award,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      dropdown: { options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    },
    {
      title: "Monetized",
      value: "54",
      change: "+12.54%",
      changeType: "up",
      icon: DollarSign,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      dropdown: { options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    },
    {
      title: "Revenue",
      value: "$567,234",
      change: "+12.54%",
      changeType: "up",
      icon: DollarSign,
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      dropdown: { options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    },
    {
      title: "Chat Messages",
      value: "7.3M",
      change: "+12.54%",
      changeType: "up",
      icon: MessageSquare,
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      dropdown: { options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' },
      comparisonText: "compared to yesterday"
    }
  ];

  const handleViewStream = (stream) => {
    navigate(`/stream/${encodeURIComponent(stream.title)}`);
  };

  const handleMoreOptions = (stream) => {
    console.log('More options for stream:', stream);
    // Implement more options functionality
  };

  const handleViewAllStreams = () => {
    console.log('View all streams');
    // Implement view all streams functionality
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Now - Top Streams</h1>
        <p className="text-gray-600">Monitor active streams and streaming metrics</p>
      </div>

      {/* Top Section - Stats Cards and Alerts */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Stats Cards Grid - 3x3 */}
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {stats.slice(0, 9).map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Alerts Sidebar */}
        <div className="col-span-1">
          <AlertsSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Live Now - Top Streams</h2>
                <button
                  onClick={handleViewAllStreams}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All Streams
                </button>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search Stream ..."
                    className="pl-8 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-200"
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
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-200">
                    <option>Most Viewers</option>
                    <option>Most Recent</option>
                    <option>Highest Rated</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Stream Cards Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {streams.map((stream) => (
                  <StreamCard
                    key={stream.id}
                    stream={stream}
                    onViewStream={handleViewStream}
                    onMoreOptions={handleMoreOptions}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActiveStreams;
