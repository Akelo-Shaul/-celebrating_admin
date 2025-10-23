import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import PendingApprovalList from './scheduled_streams_widgets/PendingApprovalList';
import ApprovedStreamsList from './scheduled_streams_widgets/ApprovedStreamsList';

const ScheduledStreams = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Scheduled Streams</h1>
        <p className="text-gray-600">Manage scheduled streams and approval workflow</p>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Scheduled Streams"
            value="43"
            icon={Calendar}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Pending Approvals"
            value="5"
            icon={Clock}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatCard
            title="Approved"
            value="10"
            icon={CheckCircle}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
        </div>
      </div>

      {/* Pending Approval Section */}
      <div className="mb-6">
        <PendingApprovalList />
      </div>

      {/* Approved Streams Section */}
      <div className="mb-6">
        <ApprovedStreamsList />
      </div>
    </div>
  );
};

export default ScheduledStreams;





