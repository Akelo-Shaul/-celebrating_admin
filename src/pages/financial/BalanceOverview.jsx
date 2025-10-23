import React, { useState, useEffect } from 'react';
import { Wallet, DollarSign, TrendingUp, Lock } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import WalletListTable from './wallet_management_widgets/WalletListTable';

const BalanceOverview = () => {
  const [wallets, setWallets] = useState([]);

  // Sample data - Replace with actual API call
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        user: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B",
          avatarColor: "bg-green-400"
        },
        userTag: {
          text: "Celebrity",
          color: "bg-orange-100 text-orange-800"
        },
        walletId: "WAL-RE-0987684",
        balance: {
          total: "$1,134,452.54",
          available: "$934,452.54",
          pending: "$200,797"
        },
        status: {
          text: "High Value",
          color: "bg-yellow-100 text-yellow-800"
        },
        lastTransaction: {
          time: "2 Hours Ago",
          total: "1234 Total"
        },
        risk: {
          text: "Low",
          color: "bg-blue-100 text-blue-800"
        }
      },
      {
        id: 2,
        user: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B",
          avatarColor: "bg-orange-400"
        },
        userTag: {
          text: "High Value Individual",
          color: "bg-green-100 text-green-800"
        },
        walletId: "WAL-RE-0987684",
        balance: {
          total: "$1,134,452.54",
          available: "$934,452.54",
          pending: null
        },
        status: {
          text: "Active",
          color: "bg-green-100 text-green-800"
        },
        lastTransaction: {
          time: "2 Hours Ago",
          total: "1234 Total"
        },
        risk: {
          text: "Mid",
          color: "bg-yellow-100 text-yellow-800"
        }
      },
      {
        id: 3,
        user: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B",
          avatarColor: "bg-orange-400"
        },
        userTag: {
          text: "Verified Member",
          color: "bg-gray-100 text-gray-800"
        },
        walletId: "WAL-RE-0987684",
        balance: {
          total: "$1,134,452.54",
          available: "$934,452.54",
          pending: null
        },
        status: {
          text: "Frozen",
          color: "bg-red-100 text-red-800"
        },
        lastTransaction: {
          time: "2 Hours Ago",
          total: "1234 Total"
        },
        risk: {
          text: "High",
          color: "bg-pink-100 text-pink-800"
        }
      }
    ];

    setWallets(sampleData);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Balance Overview</h1>
        <p className="text-gray-600 mt-1">Monitor wallet balances and transaction overview</p>
      </div>

      {/* Top Section - 8 Summary Cards (4x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Platform Balance"
          value="$108,432,242"
          change="+2.54%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Deposits Today"
          value="$5.2M"
          change="+2.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Withdrawals Today"
          value="$5.2M"
          change="+2.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Active Wallets"
          value="50,324"
          change="+2.54%"
          changeType="up"
          icon={Wallet}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
          comparisonText="compared to last week"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Frozen Wallets"
          value="12"
          subtitle="5 require review"
          icon={Lock}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatCard 
          title="High Value Wallets"
          value="56"
          subtitle=">$50K balance"
          icon={DollarSign}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard 
          title="Pending Transactions"
          value="47"
          subtitle="12 Urgent"
          icon={TrendingUp}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard 
          title="Failed Transactions"
          value="12"
          change="+12.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month'], defaultValue: 'Today' }}
          comparisonText="compared to last week"
        />
      </div>

      {/* Bottom Section - Wallet List Table */}
      <div>
        <WalletListTable wallets={wallets} />
      </div>
    </div>
  );
};

export default BalanceOverview;