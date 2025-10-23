import React from 'react'
import { ArrowUpRight, DollarSign, CheckCircle, XCircle } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TransactionTable from './transaction_history_widgets/TransactionTable'

const Withdrawals = () => {
  // Mock data
  const withdrawals = [
    {
      id: 'WDR-2024-001235',
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
      id: 'WDR-2024-001238',
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
      id: 'WDR-2024-001244',
      user: { 
        id: '11',
        name: 'Mark Johnson', 
        username: '@mjohnson',
        avatar: 'https://randomuser.me/api/portraits/men/11.jpg' 
      },
      amount: 5500,
      timestamp: '2024-01-16 09:30:15',
      status: 'Completed',
      risk: 'Low',
      method: 'Bank Transfer'
    },
    {
      id: 'WDR-2024-001245',
      user: { 
        id: '12',
        name: 'Nancy Martinez', 
        username: '@nmartinez',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg' 
      },
      amount: 3200,
      timestamp: '2024-01-16 12:15:00',
      status: 'Completed',
      risk: 'Low',
      method: 'M-Pesa'
    },
    {
      id: 'WDR-2024-001246',
      user: { 
        id: '13',
        name: 'Steven Davis', 
        username: '@sdavis',
        avatar: 'https://randomuser.me/api/portraits/men/13.jpg' 
      },
      amount: 8900,
      timestamp: '2024-01-16 14:45:20',
      status: 'Manual Review',
      risk: 'High',
      method: 'Cryptocurrency'
    },
    {
      id: 'WDR-2024-001247',
      user: { 
        id: '14',
        name: 'Karen Wilson', 
        username: '@kwilson',
        avatar: 'https://randomuser.me/api/portraits/women/14.jpg' 
      },
      amount: 1800,
      timestamp: '2024-01-16 16:20:40',
      status: 'Completed',
      risk: 'Low',
      method: 'Bank Transfer'
    }
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Withdrawals</h1>
        <p className="text-gray-600 mt-1">Manage and process withdrawal requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Withdrawals"
          value="14,235"
          change="-3.2%"
          changeType="down"
          icon={ArrowUpRight}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Withdrawal Volume"
          value="$620K"
          change="-5.1%"
          changeType="down"
          icon={DollarSign}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Processed"
          value="13,567"
          change="+2.8%"
          changeType="up"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Failed/Rejected"
          value="668"
          change="+5.4%"
          changeType="up"
          icon={XCircle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="compared to last month"
        />
      </div>

      {/* Withdrawals Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Withdrawals</h2>
          <p className="text-sm text-gray-600 mt-1">Complete list of all withdrawal transactions</p>
        </div>
        <div className="p-6">
          <TransactionTable transactions={withdrawals} showType={false} />
        </div>
      </div>
    </div>
  )
}

export default Withdrawals

