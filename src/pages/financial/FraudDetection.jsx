import React from 'react';
import { AlertTriangle, Flag, MapPin, XCircle, Zap } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import RealTimeAlerts from './fraud_detection_widgets/RealTimeAlerts';
import FlaggedAccounts from './fraud_detection_widgets/FlaggedAccounts';

const FraudDetection = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fraud Detection and Alerts</h1>
        <p className="text-gray-600">Monitor and manage fraud detection alerts and flagged accounts</p>
      </div>

      {/* Summary Cards Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard
            title="High Risk Alerts"
            value="7"
            subtitle="$20K Volume"
            change="+2.54%"
            changeType="up"
            icon={AlertTriangle}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week', 'This Month'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Flagged Account"
            value="13"
            icon={Flag}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week', 'This Month'], defaultValue: 'Today' }}
          />
          <StatCard
            title="Suspicious Logins"
            value="5"
            subtitle="From unusual locations"
            change="+2.54%"
            changeType="up"
            icon={MapPin}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week', 'This Month'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Failed Payments"
            value="15"
            subtitle="$20K Volume"
            change="+2.54%"
            changeType="up"
            icon={XCircle}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week', 'This Month'], defaultValue: 'Today' }}
            comparisonText="compared to yesterday"
          />
          <StatCard
            title="Velocity Violations"
            value="12"
            subtitle="Accounts Flagged"
            icon={Zap}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            dropdown={{ options: ['Today', 'Yesterday', 'This Week', 'This Month'], defaultValue: 'Today' }}
          />
        </div>
      </div>

      {/* Real Time Alerts Section */}
      <div className="mb-6">
        <RealTimeAlerts />
      </div>

      {/* Flagged Accounts Section */}
      <div className="mb-6">
        <FlaggedAccounts />
      </div>
    </div>
  );
};

export default FraudDetection;





