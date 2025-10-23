import React, { useState } from 'react';
import { FolderOpen, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import CategoryCard from './event_categories_widgets/CategoryCard';
import CategoryDistribution from './event_categories_widgets/CategoryDistribution';
import RevenueByCategory from './event_categories_widgets/RevenueByCategory';
import GrowthLeaders from './event_categories_widgets/GrowthLeaders';
import CategoryDetailsTable from './event_categories_widgets/CategoryDetailsTable';

const EventCategories = () => {
  const [activeTab, setActiveTab] = useState('overview');


  const categories = [
    {
      id: 1,
      name: "Music",
      description: "Concerts, festivals, and live music performances",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 0
    },
    {
      id: 2,
      name: "Art",
      description: "Art exhibitions, galleries, and creative events",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 1
    },
    {
      id: 3,
      name: "Entertainment",
      description: "Shows, performances, and entertainment events",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 2
    },
    {
      id: 4,
      name: "Sports",
      description: "Sporting events, tournaments, and competitions",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 3
    },
    {
      id: 5,
      name: "Business",
      description: "Conferences, seminars, and networking events",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 4
    },
    {
      id: 6,
      name: "Food",
      description: "Food festivals, tastings, and culinary events",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 5
    },
    {
      id: 7,
      name: "Technology",
      description: "Tech conferences, workshops, and innovation events",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 6
    },
    {
      id: 8,
      name: "Education",
      description: "Educational workshops, seminars, and training",
      totalEvents: 340,
      activeEvents: 43,
      revenue: 340,
      avgTicket: 340,
      growth: 340,
      index: 7
    }
  ];

  const handleEdit = (category) => {
    console.log('Edit category:', category);
  };

  const handleDelete = (category) => {
    console.log('Delete category:', category);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        );
      case 'performance':
        return (
          <div className="grid grid-cols-3 gap-6">
            <CategoryDistribution />
            <RevenueByCategory />
            <GrowthLeaders />
          </div>
        );
      case 'details':
        return <CategoryDetailsTable />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Categories</h1>
        <p className="text-gray-600">Manage and analyze event categories and their performance</p>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Categories"
            value="30"
            subtitle="Active Categories"
            icon={FolderOpen}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Events"
            value="3,453"
            subtitle="Across all Categories"
            icon={Calendar}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Total Revenue"
            value="$25M"
            subtitle="All time"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Avg Growth"
            value="27%"
            subtitle="Monthly Growth"
            icon={TrendingUp}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header with Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-8">
            <h2 className="text-lg font-semibold text-gray-900">Event Categories</h2>
            
            {/* Tab Navigation */}
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'performance'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'details'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Details
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Category ..."
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

        {/* Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default EventCategories;





