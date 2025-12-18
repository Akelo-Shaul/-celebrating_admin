import React, { useState } from 'react'
import { Clock, Flag, Shield, CheckCircle } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import ModerationQueue from './content_moderation_widgets/ModerationQueue'
import FlaggedContent from './content_moderation_widgets/FlaggedContent'
import ModerationFilters from './content_moderation_widgets/ModerationFilters'
import AutoModActions from './content_moderation_widgets/AutoModActions'
import ModerationHistory from './content_moderation_widgets/ModerationHistory'

const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState('queue')

  const tabs = [
    { id: 'queue', label: 'Moderation Queue', count: 247 },
    { id: 'flagged', label: 'Flagged Content', count: 89 },
    { id: 'auto-mod', label: 'Auto-Moderated', count: 156 },
    { id: 'history', label: 'Moderation History', count: null }
  ]

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Content Moderation</h1>
        <p className="text-sm md:text-base text-gray-600">Review and moderate user-generated content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Pending Review"
          value="247"
          subtitle="awaiting moderation"
          change="+12"
          changeType="up"
          icon={Clock}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Flagged Content"
          value="89"
          subtitle="user reports"
          change="+8"
          changeType="up"
          icon={Flag}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatCard
          title="Auto-Moderated"
          value="156"
          subtitle="by AI filters"
          change="+23"
          changeType="up"
          icon={Shield}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Approved Today"
          value="1,234"
          subtitle="posts approved"
          change="+156"
          changeType="up"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <ModerationFilters />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex gap-2 md:gap-0 -mb-px min-w-max md:min-w-0 px-2 md:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {activeTab === 'queue' && <ModerationQueue />}
          {activeTab === 'flagged' && <FlaggedContent />}
          {activeTab === 'auto-mod' && <AutoModActions />}
          {activeTab === 'history' && <ModerationHistory />}
        </div>
      </div>
    </div>
  )
}

export default ContentModeration

