import React from 'react';
import { Store, DollarSign, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import ShopTable from './active_shop_widgets/ShopTable';

const ActiveShops = () => {
  // Mock data for shops
  const mockShops = [
    {
      name: 'Marika Haloga',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '32,000',
      orderVolume: '32,000',
      followers: '32,000',
      rating: '4.5',
      trend: 'up'
    },
    {
      name: 'Cham Thum',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'down'
    },
    {
      name: 'Paward Chung',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'down'
    },
    {
      name: 'Hang Turm',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'up'
    },
    {
      name: 'Hankue Hue',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'down'
    }
  ];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Active Shops"
          value="4,209"
          icon={Store}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Shops Revenue"
          value="$234,209"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Music Category Revenue"
          value="4,209"
          change="+2.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Music', 'Fashion', 'Art', 'Beauty', 'Lifestyle'], defaultValue: 'Music' }}
          comparisonText="compared to last week"
        />
      </div>

      {/* Shops Table */}
      <ShopTable shops={mockShops} />
    </div>
  );
};

export default ActiveShops;