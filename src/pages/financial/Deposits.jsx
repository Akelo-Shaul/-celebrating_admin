import React from 'react'
import { ArrowDownRight, DollarSign, CheckCircle, Clock } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TransactionTable from './transaction_history_widgets/TransactionTable'

const Deposits = () => {
  // Mock data
  const deposits = [
    {
      id: 'DEP-2024-001234',
      user: { 
        id: '1',
        name: 'John Smith', 
        username: '@johnsmith',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg' 
      },
      amount: 5000,
      timestamp: '2024-01-15 14:23:45',
      status: 'Completed',
      risk: 'Low',
      method: 'Bank Transfer'
    },
    {
      id: 'DEP-2024-001236',
      user: { 
        id: '3',
        name: 'Michael Chen', 
        username: '@mchen',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg' 
      },
      amount: 10000,
      timestamp: '2024-01-15 16:45:12',
      status: 'Manual Review',
      risk: 'High',
      method: 'Cryptocurrency'
    },
    {
      id: 'DEP-2024-001239',
      user: { 
        id: '6',
        name: 'Lisa Anderson', 
        username: '@lisaa',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg' 
      },
      amount: 3500,
      timestamp: '2024-01-15 19:30:15',
      status: 'Completed',
      risk: 'Low',
      method: 'Credit Card'
    },
    {
      id: 'DEP-2024-001241',
      user: { 
        id: '8',
        name: 'Jennifer Lee', 
        username: '@jenlee',
        avatar: 'https://randomuser.me/api/portraits/women/8.jpg' 
      },
      amount: 4200,
      timestamp: '2024-01-15 21:00:00',
      status: 'Completed',
      risk: 'Low',
      method: 'M-Pesa'
    },
    {
      id: 'DEP-2024-001242',
      user: { 
        id: '9',
        name: 'Thomas White', 
        username: '@twhite',
        avatar: 'https://randomuser.me/api/portraits/men/9.jpg' 
      },
      amount: 7800,
      timestamp: '2024-01-16 10:15:30',
      status: 'Pending Review',
      risk: 'Medium',
      method: 'Bank Transfer'
    },
    {
      id: 'DEP-2024-001243',
      user: { 
        id: '10',
        name: 'Patricia Garcia', 
        username: '@pgarcia',
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg' 
      },
      amount: 2500,
      timestamp: '2024-01-16 11:45:00',
      status: 'Completed',
      risk: 'Low',
      method: 'PayPal'
    }
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Deposits</h1>
        <p className="text-gray-600 mt-1">Track and manage all deposit transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Deposits"
          value="28,456"
          change="+15.3%"
          changeType="up"
          icon={ArrowDownRight}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Deposit Volume"
          value="$1.8M"
          change="+12.7%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Completed"
          value="27,892"
          change="+8.5%"
          changeType="up"
          icon={CheckCircle}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Pending Review"
          value="564"
          change="+22.1%"
          changeType="up"
          icon={Clock}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          comparisonText="compared to last month"
        />
      </div>

      {/* Deposits Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Deposits</h2>
          <p className="text-sm text-gray-600 mt-1">Complete list of all deposit transactions</p>
        </div>
        <div className="p-6">
          <TransactionTable transactions={deposits} showType={false} />
        </div>
      </div>
    </div>
  )
}

export default Deposits

