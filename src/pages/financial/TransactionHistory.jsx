import React from 'react'
import { ArrowDownRight, ArrowUpRight, DollarSign, Activity } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TransactionTable from './transaction_history_widgets/TransactionTable'

const TransactionHistory = () => {
  // Mock data
  const transactions = [
    {
      id: 'TXN-2024-001234',
      type: 'Deposit',
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
      id: 'TXN-2024-001235',
      type: 'Withdrawal',
      user: { 
        id: '2',
        name: 'Sarah Johnson', 
        username: '@sarahj',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg' 
      },
      amount: 2500,
      timestamp: '2024-01-15 15:12:30',
      status: 'Pending Review',
      risk: 'Medium',
      method: 'M-Pesa'
    },
    {
      id: 'TXN-2024-001236',
      type: 'Deposit',
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
      id: 'TXN-2024-001237',
      type: 'Escrow',
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
      id: 'TXN-2024-001238',
      type: 'Withdrawal',
      user: { 
        id: '5',
        name: 'David Brown', 
        username: '@dbrown',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg' 
      },
      amount: 1200,
      timestamp: '2024-01-15 18:05:30',
      status: 'Failed',
      risk: 'Medium',
      method: 'PayPal'
    },
    {
      id: 'TXN-2024-001239',
      type: 'Deposit',
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
      id: 'TXN-2024-001240',
      type: 'Escrow',
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
      id: 'TXN-2024-001241',
      type: 'Deposit',
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
    }
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
        <p className="text-gray-600 mt-1">View and manage all platform transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Transactions"
          value="45,892"
          change="+12.5%"
          changeType="up"
          icon={Activity}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Total Volume"
          value="$2.4M"
          change="+8.2%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Deposits"
          value="$1.8M"
          change="+15.3%"
          changeType="up"
          icon={ArrowDownRight}
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Withdrawals"
          value="$620K"
          change="-3.1%"
          changeType="down"
          icon={ArrowUpRight}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="compared to last month"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Transactions</h2>
          <p className="text-sm text-gray-600 mt-1">Complete list of all platform transactions</p>
        </div>
        <div className="p-6">
          <TransactionTable transactions={transactions} showType={true} />
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory

