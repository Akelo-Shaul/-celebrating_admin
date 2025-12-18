import React, { useState, useEffect } from 'react';
import { Shield, DollarSign, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import AlertsMonitoring from './active_escrows_widgets/AlertsMonitoring';
import ActiveEscrowsTable from './active_escrows_widgets/ActiveEscrowsTable';

const ActiveEscrows = () => {
  const [escrows, setEscrows] = useState([]);

  // Sample data - Replace with actual API call
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        escrowId: "ESC-2025-0987684",
        date: "Sep 29, 2025",
        buyer: {
          name: "Tank Harm",
          handle: "@Tank",
          avatar: "T"
        },
        seller: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        product: {
          name: "Celebrity Shoutout",
          image: null
        },
        amount: 500,
        status: {
          text: "Payment confirmed",
          type: "confirmed"
        },
        age: "1d",
        releaseIn: "5d"
      },
      {
        id: 2,
        escrowId: "ESC-2025-0987684",
        date: "Sep 29, 2025",
        buyer: {
          name: "Tank Harm",
          handle: "@Tank",
          avatar: "T"
        },
        seller: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        product: {
          name: "Toda Headphones",
          image: "headphones.jpg"
        },
        amount: 500,
        status: {
          text: "Disputed",
          type: "disputed"
        },
        age: "2d",
        releaseIn: "3d"
      },
      {
        id: 3,
        escrowId: "ESC-2025-0987684",
        date: "Sep 29, 2025",
        buyer: {
          name: "Tank Harm",
          handle: "@Tank",
          avatar: "T"
        },
        seller: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        product: {
          name: "Celebrity Shoutout",
          image: null
        },
        amount: 500,
        status: {
          text: "Pending Release",
          type: "pending"
        },
        age: "2d",
        releaseIn: "3d"
      }
    ];

    setEscrows(sampleData);
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Active Escrows</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Monitor and manage active escrow transactions</p>
      </div>

      {/* Top Section - Statistical Cards (Responsive Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="col-span-1">
          <StatCard 
            title="Total Active Escrows"
            value="156"
            subtitle="Active Escrows"
            change="+2.54%"
            changeType="up"
            icon={Shield}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            comparisonText="compared to yesterday"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Total Value in Escrow"
            value="$5.2M"
            change="+2.54%"
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            comparisonText="compared to yesterday"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Pending Release"
            value="47"
            change="+2.54%"
            changeType="up"
            icon={Clock}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            comparisonText="compared to yesterday"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Disputed"
            value="5"
            change="-2.54%"
            changeType="down"
            icon={AlertTriangle}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            comparisonText="compared to yesterday"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Auto Release Today"
            value="12"
            icon={CheckCircle}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Overdue Escrows"
            value="4"
            change="+2.54%"
            changeType="up"
            icon={AlertTriangle}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            comparisonText="compared to yesterday"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="High Value Escrows"
            value="47"
            change="+2.54%"
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            comparisonText="compared to yesterday"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Platform Fee Revenue"
            value="$800K"
            change="+12.54%"
            changeType="up"
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            comparisonText="compared to last week"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Avg Duration"
            value="6.5 days"
            change="-0.4 days"
            changeType="down"
            icon={Clock}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            comparisonText="compared to last week"
          />
        </div>
      </div>

      {/* Additional Row for Release Success Rate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="col-span-1">
          <StatCard
            title="Release Success rate"
            value="98%"
            change="-0.54%"
            changeType="down"
            icon={CheckCircle}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            comparisonText="compared to yesterday"
          />
        </div>
        <div className="hidden lg:block lg:col-span-2"></div>
      </div>

      {/* Middle Section - Alerts & Monitoring */}
      <div className="mb-6">
        <AlertsMonitoring />
      </div>

      {/* Bottom Section - Active Escrows List */}
      <div>
        <ActiveEscrowsTable escrows={escrows} />
      </div>
    </div>
  );
};

export default ActiveEscrows;





