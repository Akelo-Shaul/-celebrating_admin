import React from 'react';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import ShopTable from './pending_approvals_widgets/ShopTable';

const PendingApprovals = () => {
  // Mock data for pending shops
  const mockShops = [
    {
      name: 'Marika Haloga',
      creatorImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      waitTime: '5 days',
      followers: '32,000',
      category: 'Music',
      rating: '4.5'
    },
    {
      name: 'Cham Thum',
      creatorImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      waitTime: '10 days',
      followers: '23,000',
      category: 'Art',
      rating: '4.3'
    },
    {
      name: 'Paward Chung',
      creatorImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      waitTime: '10 days',
      followers: '23,000',
      category: 'Beauty',
      rating: '4.3'
    },
    {
      name: 'Hang Turm',
      creatorImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      waitTime: '10 days',
      followers: '23,000',
      category: 'Lifestyle',
      rating: '4.3'
    },
    {
      name: 'Hankue Hue',
      creatorImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      waitTime: '10 days',
      followers: '23,000',
      category: 'Music',
      rating: '4.3'
    },
    {
      name: 'Hankue Hue',
      creatorImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      waitTime: '10 days',
      followers: '23,000',
      category: 'Fashion',
      rating: '4.3'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
        <p className="text-gray-600 mt-1">Review and approve shop applications awaiting verification</p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Pending Approvals"
          value="4,209"
          icon={Clock}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Average Wait Time"
          value="1 week"
          change="-2.54%"
          changeType="down"
          icon={TrendingDown}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          dropdown={{ options: ['This Week', 'This Month', 'This Quarter'], defaultValue: 'This Week' }}
          comparisonText="compared to last week"
        />
        <StatCard
          title="Music Category Revenue"
          value="4,209"
          change="+2.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Music', 'Fashion', 'Art', 'Beauty', 'Lifestyle'], defaultValue: 'Music' }}
          comparisonText="compared to last week"
        />
      </div>

      {/* Pending Shops Table */}
      <ShopTable shops={mockShops} />
    </div>
  );
};

export default PendingApprovals;