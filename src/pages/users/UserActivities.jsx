import React from 'react'
import { FileText, Heart, MessageSquare, Repeat, Store, Video, Users } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import UserGrowthChart from './user_activities_widgets/UserGrowthChart'
import PostCountChart from './user_activities_widgets/PostCountChart'
import EngagementChart from './user_activities_widgets/EngagementChart'
import ShopGrowthChart from './user_activities_widgets/ShopGrowthChart'
import WalletGrowthChart from './user_activities_widgets/WalletGrowthChart'
import EventsReportChart from './user_activities_widgets/EventsReportChart'

export default function UserActivities() {
  const stats = [
    { title: 'All Posts', value: '124,209', suffix: 'Posts', change: '+2.54%', icon: FileText, iconBgColor: 'bg-blue-100', iconColor: 'text-blue-600', comparisonText: 'compared to last year' },
    { title: 'All Salutes', value: '104,209', suffix: 'Salutes', change: '+2.54%', icon: Heart, iconBgColor: 'bg-red-100', iconColor: 'text-red-600', comparisonText: 'compared to last year' },
    { title: 'All Comments', value: '4,209', change: '+2.54%', icon: MessageSquare, iconBgColor: 'bg-purple-100', iconColor: 'text-purple-600', comparisonText: 'compared to last week' },
    { title: 'All Reposts', value: '104,209', suffix: 'Reposts', change: '+2.54%', icon: Repeat, iconBgColor: 'bg-green-100', iconColor: 'text-green-600', comparisonText: 'compared to last year' },
    { title: 'All Shops', value: '54,209', suffix: 'Shops', change: '+2.54%', icon: Store, iconBgColor: 'bg-orange-100', iconColor: 'text-orange-600', comparisonText: 'compared to last year' },
    { title: 'All ReCelebrations', value: '95,209', suffix: 'Posts', change: '+2.54%', icon: Repeat, iconBgColor: 'bg-indigo-100', iconColor: 'text-indigo-600', comparisonText: 'compared to last year' },
    { title: 'All Streams', value: '4,209', change: '+2.54%', icon: Video, iconBgColor: 'bg-pink-100', iconColor: 'text-pink-600', comparisonText: 'compared to last year' },
    { title: 'Member Count', value: '95,209', suffix: 'Users', change: '+2.54%', icon: Users, iconBgColor: 'bg-cyan-100', iconColor: 'text-cyan-600', comparisonText: 'compared to last year' }
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Activities</h1>
        <p className="text-gray-600 mt-1">Monitor user engagement, content creation, and platform interactions</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard 
              key={i}
              title={stat.title}
              value={stat.value}
              suffix={stat.suffix}
              change={stat.change}
              changeType="up"
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
              iconColor={stat.iconColor}
              comparisonText={stat.comparisonText}
            />
          ))}
        </div>

        <div className="lg:col-span-6">
          <UserGrowthChart />
        </div>
        <div className="lg:col-span-6">
          <PostCountChart />
        </div>

        <div className="lg:col-span-6">
          <EngagementChart />
        </div>
        <div className="lg:col-span-6">
          <ShopGrowthChart />
        </div>

        <div className="lg:col-span-6">
          <WalletGrowthChart />
        </div>
        <div className="lg:col-span-6">
          <EventsReportChart />
        </div>
      </div>
    </div>
  )
}
