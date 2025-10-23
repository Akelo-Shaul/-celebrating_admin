import React, { useState, useEffect } from 'react';
import { FolderOpen, TrendingUp, Award } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import CategoryListTable from './category_list_widgets/CategoryListTable';
import ContentVolumeChart from './category_list_widgets/ContentVolumeChart';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // Sample data - Replace with actual API call
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        name: "Music",
        description: "Great rhythms form top artists",
        celebrations: "20,000",
        trend: { direction: "up", value: "20%" },
        engagements: "32,000",
        followers: "32,000",
        rating: "4.5"
      },
      {
        id: 2,
        name: "Travel And Adventure",
        description: "Great rhythms form top artists",
        celebrations: "50,000",
        trend: { direction: "down", value: "20%" },
        engagements: "23,000",
        followers: "23,000",
        rating: "4.3"
      },
      {
        id: 3,
        name: "Paward Chung",
        description: "Great rhythms form top artists",
        celebrations: "10,000",
        trend: { direction: "down", value: "20%" },
        engagements: "23,000",
        followers: "23,000",
        rating: "4.3"
      },
      {
        id: 4,
        name: "Hang Turm",
        description: "Great rhythms form top artists",
        celebrations: "4,000",
        trend: { direction: "up", value: "20%" },
        engagements: "23,000",
        followers: "23,000",
        rating: "4.3"
      },
      {
        id: 5,
        name: "Hankue Hue",
        description: "Great rhythms form top artists",
        celebrations: "3,089",
        trend: { direction: "down", value: "20%" },
        engagements: "23,000",
        followers: "23,000",
        rating: "4.3"
      },
      {
        id: 6,
        name: "Hankue Hue",
        description: "Great rhythms form top artists",
        celebrations: "50,000",
        trend: { direction: "down", value: "20%" },
        engagements: "23,000",
        followers: "23,000",
        rating: "4.3"
      }
    ];

    setCategories(sampleData);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Category List</h1>
        <p className="text-gray-600 mt-1">Category analytics and management</p>
      </div>

      {/* Top Section - Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Categories"
          value="15"
          subtitle="Active Categories"
          icon={FolderOpen}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Most Popular"
          value="Lifestyle"
          subtitle="By Celebration Count"
          icon={Award}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Trending Category"
          value="Technology"
          change="+2.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['This Week', 'Last Week', 'This Month'], defaultValue: 'This Week' }}
          comparisonText="compared to last week"
        />
      </div>

      {/* Middle Section - Category List Table */}
      <div className="mb-6">
        <CategoryListTable categories={categories} />
      </div>

      {/* Bottom Section - Content Volume Chart */}
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <ContentVolumeChart />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;





