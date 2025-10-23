import React from 'react'
import { Shield, DollarSign, Clock, CheckCircle } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TransactionTable from './transaction_history_widgets/TransactionTable'

const Escrows = () => {
  // Mock data
  const escrows = [
    {
      id: 'ESC-2024-001237',
      user: { 
        id: '4',
        name: 'Emma Wilson', 
        username: '@emmaw',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg' 
      },
      amount: 7500,
      timestamp: '2024-01-15 17:20:00',
      status: 'Approving',
      risk: 'Low',
      method: 'Bank Transfer'
    },
    {
      id: 'ESC-2024-001240',
      user: { 
        id: '7',
        name: 'Robert Taylor', 
        username: '@rtaylor',
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg' 
      },
      amount: 15000,
      timestamp: '2024-01-15 20:15:45',
      status: 'Pending Review',
      risk: 'High',
      method: 'Bank Transfer'
    },
    {
      id: 'ESC-2024-001248',
      user: { 
        id: '15',
        name: 'Daniel Moore', 
        username: '@dmoore',
        avatar: 'https://randomuser.me/api/portraits/men/15.jpg' 
      },
      amount: 12000,
      timestamp: '2024-01-16 08:30:00',
      status: 'Completed',
      risk: 'Medium',
      method: 'Bank Transfer'
    },
    {
      id: 'ESC-2024-001249',
      user: { 
        id: '16',
        name: 'Betty Taylor', 
        username: '@btaylor',
        avatar: 'https://randomuser.me/api/portraits/women/16.jpg' 
      },
      amount: 5600,
      timestamp: '2024-01-16 11:00:20',
      status: 'Approving',
      risk: 'Low',
      method: 'M-Pesa'
    },
    {
      id: 'ESC-2024-001250',
      user: { 
        id: '17',
        name: 'Paul Anderson', 
        username: '@panderson',
        avatar: 'https://randomuser.me/api/portraits/men/17.jpg' 
      },
      amount: 9800,
      timestamp: '2024-01-16 13:45:10',
      status: 'Pending Review',
      risk: 'Medium',
      method: 'Bank Transfer'
    },
    {
      id: 'ESC-2024-001251',
      user: { 
        id: '18',
        name: 'Sandra Thomas', 
        username: '@sthomas',
        avatar: 'https://randomuser.me/api/portraits/women/18.jpg' 
      },
      amount: 4300,
      timestamp: '2024-01-16 15:30:45',
      status: 'Completed',
      risk: 'Low',
      method: 'PayPal'
    }
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Escrow Transactions</h1>
        <p className="text-gray-600 mt-1">Monitor and manage escrow-held funds</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Active Escrows"
          value="3,201"
          change="+18.5%"
          changeType="up"
          icon={Shield}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Escrow Volume"
          value="$1.2M"
          change="+24.3%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Released Today"
          value="156"
          change="+12.4%"
          changeType="up"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to yesterday"
        />
        <StatCard
          title="Pending Release"
          value="892"
          change="+6.8%"
          changeType="up"
          icon={Clock}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          comparisonText="compared to last week"
        />
      </div>

      {/* Escrows Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Escrow Transactions</h2>
          <p className="text-sm text-gray-600 mt-1">Complete list of all escrow-held transactions</p>
        </div>
        <div className="p-6">
          <TransactionTable transactions={escrows} showType={false} />
        </div>
      </div>
    </div>
  )
}

export default Escrows

