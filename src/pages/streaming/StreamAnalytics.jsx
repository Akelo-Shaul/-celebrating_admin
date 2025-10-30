import React from 'react';
import { Radio, Users, Calendar, Clock, Eye, Timer, DollarSign, TrendingUp, MessageSquare } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import StreamsByCategoryChart from './stream_analytics_widgets/StreamsByCategoryChart';
import MonetizationTypesChart from './stream_analytics_widgets/MonetizationTypesChart';
import PlatformGrowthChart from './stream_analytics_widgets/PlatformGrowthChart';
import PeakHoursChart from './stream_analytics_widgets/PeakHoursChart';
import TopStreamersList from './stream_analytics_widgets/TopStreamersList';

const StreamAnalytics = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Stream Analytics</h1>
        <p className="text-gray-600">Comprehensive analytics and insights for streaming performance</p>
      </div>

      {/* Stats Cards Section - 3x3 Grid */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Live Now"
            value="150"
            change="+2.54%"
            changeType="up"
            icon={Radio}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            dropdown={{ options: ['Today', 'This Hour', 'Last Hour'], defaultValue: 'Today' }}
            comparisonText="compared to last hour"
          />
          <StatCard
            title="Concurrent Viewers"
            value="483,456"
            change="+2.54%"
            changeType="up"
            icon={Users}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            dropdown={{ options: ['Today', 'This Hour', 'Last Hour'], defaultValue: 'Today' }}
            comparisonText="compared to last hour"
          />
          <StatCard
            title="Scheduled Streams"
            value="43"
            icon={Calendar}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            dropdown={{ options: ['Today', 'This Week', 'This Month'], defaultValue: 'Today' }}
          />
          <StatCard
            title="Watch Time"
            value="20.4K hrs"
            change="+12.54%"
            changeType="up"
            icon={Clock}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Peak Viewers"
            value="567,234"
            change="+12.54%"
            changeType="up"
            icon={Eye}
            iconBgColor="bg-indigo-100"
            iconColor="text-indigo-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Avg Stream Duration"
            value="70 mins"
            change="+12.54%"
            changeType="up"
            icon={Timer}
            iconBgColor="bg-cyan-100"
            iconColor="text-cyan-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Monetized"
            value="54"
            change="+12.54%"
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Revenue"
            value="$567,234"
            change="+12.54%"
            changeType="up"
            icon={TrendingUp}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Chat Messages"
            value="7.3M"
            change="+12.54%"
            changeType="up"
            icon={MessageSquare}
            iconBgColor="bg-pink-100"
            iconColor="text-pink-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
        </div>
      </div>

      {/* Charts Section - 2 Cards Side by Side */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <StreamsByCategoryChart />
          </div>
          <div className="col-span-1">
            <MonetizationTypesChart />
          </div>
        </div>
      </div>

      {/* Bottom Section - make the two charts share the row and move the list below */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <PlatformGrowthChart />
          </div>
          <div className="col-span-1">
            <PeakHoursChart />
          </div>
        </div>

        {/* Place Top Streamers list below the charts, full width on small and md */}
        <div className="mt-6">
          <TopStreamersList />
        </div>
      </div>
    </div>
  );
};

export default StreamAnalytics;





