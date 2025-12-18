import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import AllRatingsTable from './all_ratings_widgets/AllRatingsTable';
import AverageRatingByCategory from './all_ratings_widgets/AverageRatingByCategory';

const AllRatings = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">All Ratings</h1>
        <p className="text-sm md:text-base text-gray-600">Manage and view all ratings across the platform</p>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <StatCard
            title="Total Ratings"
            value="15.6M"
            subtitle="All Categories"
            icon={Star}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Top Category"
            value="Entertainment"
            icon={TrendingUp}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* All Ratings Table */}
        <div className="col-span-1 lg:col-span-3">
          <AllRatingsTable />
        </div>

        {/* Average Rating By Category Sidebar */}
        <div className="col-span-1">
          <AverageRatingByCategory />
        </div>
      </div>
    </div>
  );
};

export default AllRatings;





