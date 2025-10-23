import React from 'react';
import { Users, UserPlus, Activity, Percent, TrendingDown, Clock } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import EngagementTimeCard from './user_engagement_widgets/EngagementTimeCard';
import EngagementSectionsChart from './user_engagement_widgets/EngagementSectionsChart';

const UserEngagement = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Engagement</h1>
        <p className="text-gray-600 mt-1">Engagement metrics and user activity insights</p>
      </div>

      {/* Top Row - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <EngagementTimeCard />
        <EngagementSectionsChart />
        <StatCard 
          title="Monthly Active Users"
          value="1,000,000"
          suffix="Users"
          change="+2.54%"
          changeType="up"
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="compared to last month"
        />
      </div>

      {/* Middle Row - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Daily Active Users"
          value="50,000"
          suffix="Users"
          change="+2.54%"
          changeType="up"
          icon={Users}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="New Users"
          value="1,000"
          change="+2.54%"
          changeType="up"
          icon={UserPlus}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          comparisonText="compared to last week"
        />
        <StatCard 
          title="Total Platform Interactions"
          value="50,000,000"
          suffix="Interactions"
          change="+2.54%"
          changeType="up"
          icon={Activity}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          dropdown={{ options: ['Today', 'Yesterday', 'This Week', 'This Month'], defaultValue: 'Today' }}
          comparisonText="compared to yesterday"
        />
      </div>

      {/* Bottom Row - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="User Retention Rate"
          value="20%"
          change="+2.54%"
          changeType="up"
          icon={Percent}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
          dropdown={{ options: ['This Month', 'Last Month', 'This Quarter'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard 
          title="Engagement Rate"
          subtitle="Total Interactions / Total Impressions"
          value="500,000"
          suffix="Interactions"
          change="+2.54%"
          changeType="up"
          icon={Activity}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
          dropdown={{ options: ['Today', 'Yesterday', 'This Week'], defaultValue: 'Today' }}
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Peak Platform Interaction"
          value="500,000"
          suffix="Interactions"
          subtitle="0800 EAT"
          change="+2.54%"
          changeType="up"
          icon={TrendingDown}
          iconBgColor="bg-cyan-100"
          iconColor="text-cyan-600"
          comparisonText="compared to yesterday"
        />
      </div>

      {/* Bottom Left - 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Churn Rate"
          value="170"
          change="-2.54%"
          changeType="down"
          icon={TrendingDown}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          dropdown={{ options: ['This Week', 'Last Week', 'This Month'], defaultValue: 'This Week' }}
          comparisonText="compared to last week"
        />
        <StatCard 
          title="Peak Hours"
          value="1800 EAT"
          subtitle="Today"
          icon={Clock}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>
    </div>
  );
};

export default UserEngagement;





