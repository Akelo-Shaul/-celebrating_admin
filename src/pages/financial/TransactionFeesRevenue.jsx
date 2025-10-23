import React from 'react'
import { DollarSign, ArrowDownCircle, ArrowUpCircle, Shield, Calendar, Ticket } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import FeeBreakdownChart from './transaction_fees_widgets/FeeBreakdownChart'
import FeesByTypeTable from './transaction_fees_widgets/FeesByTypeTable'
import FeeTrends from './transaction_fees_widgets/FeeTrends'

const TransactionFeesRevenue = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transaction Fees Revenue</h1>
        <p className="text-gray-600">Detailed breakdown of revenue from transaction fees</p>
      </div>

      {/* Stats Cards - 3x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Fee Revenue"
          value="$960K"
          change="+12.5%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Deposit Fees"
          value="$384K"
          subtitle="40% of total fees"
          change="+8.3%"
          changeType="up"
          icon={ArrowDownCircle}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Withdrawal Fees"
          value="$288K"
          subtitle="30% of total fees"
          change="+5.1%"
          changeType="up"
          icon={ArrowUpCircle}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Escrow Fees"
          value="$144K"
          subtitle="15% of total fees"
          change="+15.2%"
          changeType="up"
          icon={Shield}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Booking Fees"
          value="$96K"
          subtitle="10% of total fees"
          change="+7.8%"
          changeType="up"
          icon={Calendar}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
        <StatCard
          title="Ticket Purchase Fees"
          value="$48K"
          subtitle="5% of total fees"
          change="+10.3%"
          changeType="up"
          icon={Ticket}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month', 'This Year'], defaultValue: 'This Month' }}
          comparisonText="compared to last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Fee Breakdown - 5 columns */}
        <div className="col-span-5">
          <FeeBreakdownChart />
        </div>
        
        {/* Fee Trends - 7 columns */}
        <div className="col-span-7">
          <FeeTrends />
        </div>
      </div>

      {/* Table */}
      <div>
        <FeesByTypeTable />
      </div>
    </div>
  )
}

export default TransactionFeesRevenue

