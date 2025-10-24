import React from 'react'
import { Wallet, TrendingUp, DollarSign } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TransactionOverview from './wallet_widgets/TransactionOverview'
import WalletDistribution from './wallet_widgets/WalletDistribution'
import LargestWallets from './wallet_widgets/BestSellers'
import GrowthReport from './wallet_widgets/SalesReport'

export default function WalletOverview() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Wallet Overview</h1>
        <p className="text-gray-600 mt-1">Monitor wallet activity, transactions, and financial trends</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top stat cards (span 8) and right distribution (span 4) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Active Wallets" 
            value="124,209"
            subtitle="active"
            change="+2.54%" 
            changeType="up"
            icon={Wallet}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            comparisonText="compared to last year"
          />
          <StatCard 
            title="Transaction Volume" 
            value="$124,209"
            change="+2.54%" 
            changeType="up"
            icon={TrendingUp}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            comparisonText="compared to last year"
          />
          <StatCard 
            title="Sales Volume" 
            value="$124,209"
            change="+2.54%" 
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            comparisonText="compared to last year"
          />

          {/* Transaction overview spanning full width of left area */}
          <div className="md:col-span-3">
            <TransactionOverview />
          </div>
        </div>

        <div className="lg:col-span-4">
          <WalletDistribution />
        </div>

        {/* Bottom area: largest wallets and growth report */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-4">
          <LargestWallets />
        </div>

        <div className="lg:col-span-4">
          <GrowthReport />
        </div>
      </div>
    </div>
  )
}
