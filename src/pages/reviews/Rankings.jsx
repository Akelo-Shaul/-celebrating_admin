import React from 'react';
import { Award, TrendingUp, TrendingDown, Heart, DollarSign, Star, Activity, Hash, Search, Share2, ShoppingBag } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import LiveFeed from './rankings_widgets/LiveFeed';
import TrendingCard from './rankings_widgets/TrendingCard';
import FastestGrowingTable from './rankings_widgets/FastestGrowingTable';
import TopGainersList from './rankings_widgets/TopGainersList';
import BiggestFallersList from './rankings_widgets/BiggestFallersList';

const Rankings = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rankings</h1>
        <p className="text-gray-600">Track performance metrics and rankings across the platform</p>
      </div>

      {/* Stats Cards Grid - 3 rows of 4 cards each */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="#1 Celebrity"
            value="@Hank Mcoy"
            subtitle="485M followers"
            icon={Award}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Fastest Riser"
            value="@Braum Halabery"
            subtitle="+32 positions"
            change="+2.54%"
            changeType="up"
            icon={TrendingUp}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Biggest Drop"
            value="@Drao Gyan"
            subtitle="-4 positions"
            change="-12%"
            changeType="down"
            icon={TrendingDown}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
          />
          <StatCard
            title="Most Engaged"
            value="12.5%"
            subtitle="@Braum Hallabery"
            change="+2.54%"
            changeType="up"
            icon={Heart}
            iconBgColor="bg-pink-100"
            iconColor="text-pink-600"
          />
          <StatCard
            title="Top Earner"
            value="$34M/mo"
            subtitle="@WhiteLotisZ"
            change="+12.54%"
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Highest Rated"
            value="4.8"
            subtitle="@hank mcoy"
            icon={Star}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Most Active"
            value="15 posts/wk"
            subtitle="@WhiteLotisZ"
            icon={Activity}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Trending Topic"
            value="#NewMusic"
            subtitle="243k mentions"
            change="+532%"
            changeType="up"
            icon={Hash}
            iconBgColor="bg-indigo-100"
            iconColor="text-indigo-600"
          />
          <StatCard
            title="Top Search"
            value="@Bram Hallaberyr"
            subtitle="@WhiteLotisZ"
            change="+340%"
            changeType="up"
            icon={Search}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Most Shared"
            value="@homa_dag"
            subtitle="800k shares"
            change="+532%"
            changeType="up"
            icon={Share2}
            iconBgColor="bg-cyan-100"
            iconColor="text-cyan-600"
          />
          <StatCard
            title="#1 Shop"
            value="Mtum Hagun"
            subtitle="43M followers"
            change="+340%"
            changeType="up"
            icon={ShoppingBag}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatCard
            title="Most Shared"
            value="@homa_dag"
            subtitle="800k shares"
            change="+532%"
            changeType="up"
            icon={Share2}
            iconBgColor="bg-teal-100"
            iconColor="text-teal-600"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Live Feed */}
          <LiveFeed />
          
          {/* Trending in the Past 24 Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending in the Past 24 Hours</h3>
            <div className="space-y-4">
              <TrendingCard />
              <TrendingCard />
            </div>
          </div>
          
          {/* Top Gainers */}
          <TopGainersList />
        </div>

        {/* Middle Column */}
        <div className="col-span-1">
          {/* Fastest Growing */}
          <FastestGrowingTable />
        </div>

        {/* Right Column */}
        <div className="col-span-1">
          {/* Biggest Fallers */}
          <BiggestFallersList />
        </div>
      </div>
    </div>
  );
};

export default Rankings;





