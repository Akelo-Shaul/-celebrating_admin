import React, { useState, useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight, Shield, DollarSign, TrendingUp, Clock } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import TransactionListTable from './transaction_log_widgets/TransactionListTable';

const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);

  // Sample data - Replace with actual API call
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        transactionId: "DEP-RE-0987684",
        user: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B",
          avatarColor: "bg-orange-400"
        },
        amount: "23,500",
        timestamp: "30/09/25 14:00:32",
        status: {
          text: "Pending Review",
          color: "bg-yellow-100 text-yellow-800"
        },
        risk: {
          text: "Low",
          color: "bg-blue-100 text-blue-800"
        }
      },
      {
        id: 2,
        transactionId: "DEP-RE-0987684",
        user: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B",
          avatarColor: "bg-orange-400"
        },
        amount: "15,000",
        timestamp: "30/09/25 14:00:32",
        status: {
          text: "Approving",
          color: "bg-green-100 text-green-800"
        },
        risk: {
          text: "Mid",
          color: "bg-yellow-100 text-yellow-800"
        }
      },
      {
        id: 3,
        transactionId: "DEP-RE-0987684",
        user: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B",
          avatarColor: "bg-orange-400"
        },
        amount: "100,000",
        timestamp: "30/09/25 14:00:32",
        status: {
          text: "Manual Review",
          color: "bg-red-100 text-red-800"
        },
        risk: {
          text: "High",
          color: "bg-red-100 text-red-800"
        }
      }
    ];

    setTransactions(sampleData);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transaction Log</h1>
        <p className="text-gray-600 mt-1">Monitor and manage transaction activities</p>
      </div>

      {/* Top Section - 6 Summary Cards (2x3 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Deposit Volume"
          value="$3.4M"
          subtitle="5000 Transactions"
          change="+2.54%"
          changeType="up"
          icon={ArrowDownRight}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          dropdown={{ options: ['Today', 'This Week', 'This Month'], defaultValue: 'Today' }}
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Withdrawal Volume"
          value="$5.2M"
          subtitle="5000 Transactions"
          change="+2.54%"
          changeType="up"
          icon={ArrowUpRight}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Pending Deposits"
          value="$59K"
          change="+2.54%"
          changeType="up"
          icon={Clock}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          comparisonText="compared to yesterday"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Pending Withdrawals"
          value="$27K"
          change="+2.54%"
          changeType="up"
          icon={Clock}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Rejected Transactions"
          value="12"
          subtitle="5 require review"
          icon={Shield}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatCard 
          title="Failed Transactions"
          value="12"
          change="+12.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          comparisonText="compared to last week"
        />
      </div>

      {/* Bottom Section - Transaction List Table */}
      <div>
        <TransactionListTable transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionLog;