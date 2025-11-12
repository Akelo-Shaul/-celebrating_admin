import React, { useEffect, useState } from 'react'
import { Hash, Tag, TrendingUp } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TagUsageChart from './content_tags_widgets/TagUsageChart'
import TagListTable from './content_tags_widgets/TagListTable'

const ContentTags = () => {
  const [summary, setSummary] = useState({})

  useEffect(() => {
    // sample summary - replace with API calls
    setSummary({ totalTags: 128, totalTaggedPosts: '1.5M', avgTagEngagement: '3.2K' })
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Content Tags</h1>
        <p className="text-gray-600 mt-1">Manage and analyze content tags across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Tags"
          value={summary.totalTags || '—'}
          subtitle="Active tags"
          icon={Hash}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        />

        <StatCard
          title="Total Tagged Posts"
          value={summary.totalTaggedPosts || summary.totalTaggedPosts || '—'}
          subtitle="All time"
          icon={Tag}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
        />

        <StatCard
          title="Avg Tag Engagement"
          value={summary.avgTagEngagement || '—'}
          subtitle="Per tag"
          icon={TrendingUp}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TagListTable />
          </div>

          <div className="lg:col-span-1">
            <TagUsageChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentTags
