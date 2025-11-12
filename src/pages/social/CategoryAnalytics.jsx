import React, { useEffect, useState } from 'react'
import { FolderOpen, TrendingUp, Award } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import ContentVolumeChart from './category_list_widgets/ContentVolumeChart'
import CategoryListTable from './category_list_widgets/CategoryListTable'
import CategoriesByEngagementChart from './category_analytics_widgets/CategoriesByEngagementChart'

const CategoryAnalytics = () => {
  const [summary, setSummary] = useState({})

  useEffect(() => {
    // sample summary data - replace with API call
    setSummary({
      totalCategories: 32,
      totalContent: '1.2M',
      avgEngagement: '4.3K',
      topCategory: 'Music'
    })
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Category Analytics</h1>
        <p className="text-gray-600 mt-1">Insights and metrics across content categories</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Categories"
          value={summary.totalCategories || '—'}
          subtitle="Active categories"
          icon={FolderOpen}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Total Content"
          value={summary.totalContent || '—'}
          subtitle="Celebrations & posts"
          icon={Award}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />

        <StatCard
          title="Avg Engagement"
          value={summary.avgEngagement || '—'}
          subtitle="Per category"
          icon={TrendingUp}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Middle Charts */}
      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContentVolumeChart />
          </div>

          <div className="lg:col-span-1">
            <CategoriesByEngagementChart />
          </div>
        </div>
      </div>

      {/* Bottom - Category List */}
      <div className="mb-6">
        <CategoryListTable />
      </div>
    </div>
  )
}

export default CategoryAnalytics
