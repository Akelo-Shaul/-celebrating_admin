import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Handshake, DollarSign, AlertCircle, FileText, Eye, ThumbsUp, ThumbsDown, AlertTriangle, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import DisputeOverview from './dispute_resolution_widgets/DisputeOverview';
import DisputesTypesChart from './dispute_resolution_widgets/DisputesTypesChart';
import ResolutionTimeChart from './dispute_resolution_widgets/ResolutionTimeChart';
import AdminPerformance from './dispute_resolution_widgets/AdminPerformance';
import PatternAnalytics from './dispute_resolution_widgets/PatternAnalytics';
import DisputeListTable from './dispute_resolution_widgets/DisputeListTable';

const DisputeResolution = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [disputes, setDisputes] = useState([]);

  // Sample data - Replace with actual API call
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        escrowId: "Dls-2025-0987684",
        issue: "Not Received",
        filedOn: "Sep 29, 2025",
        complainant: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        respondent: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        amount: 500,
        status: {
          text: "Evidence Collection",
          type: "evidence"
        },
        age: "1d",
        assignedTo: {
          name: "Alex",
          avatar: "A"
        },
        rowColor: "bg-green-50"
      },
      {
        id: 2,
        escrowId: "Dls-2025-0987684",
        issue: "Did Not Make Appearance",
        filedOn: "Sep 29, 2025",
        complainant: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        respondent: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        amount: 500,
        status: {
          text: "Under Investigation",
          type: "investigation"
        },
        age: "2d",
        assignedTo: {
          name: "Tank",
          avatar: "T"
        },
        rowColor: "bg-pink-50"
      },
      {
        id: 3,
        escrowId: "Dls-2025-0987684",
        issue: "Fraud",
        filedOn: "Sep 29, 2025",
        complainant: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        respondent: {
          name: "Braum Hallabery",
          handle: "@braum",
          avatar: "B"
        },
        amount: 500,
        status: {
          text: "Mediation",
          type: "mediation"
        },
        age: "2d",
        assignedTo: {
          name: "Zack",
          avatar: "Z"
        },
        rowColor: "bg-yellow-50"
      }
    ];

    setDisputes(sampleData);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'disputes', label: 'Disputes' }
  ];

  const renderOverviewTab = () => (
    <>
      {/* Top Row - 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
        <StatCard
          title="Resolution Rate"
          value="98%"
          change="+2.54%"
          changeType="up"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Avg Resolution Time"
          value="4.5 days"
          change="-0.4 days"
          changeType="down"
          icon={Clock}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="compared to last week"
        />
        <StatCard
          title="Mediation Success"
          value="80%"
          change="+2.54%"
          changeType="up"
          icon={Handshake}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          comparisonText="compared to last month"
        />
        <StatCard
          title="Total Disputed Value Resolved"
          value="$1,079,7628"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Middle Row - 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div>
          <DisputeOverview />
        </div>
        <div>
          <DisputesTypesChart />
        </div>
      </div>

      {/* Bottom Row - 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div>
          <ResolutionTimeChart />
        </div>
        <div>
          <AdminPerformance />
        </div>
      </div>

      {/* Pattern Analytics Table */}
      <div className="mb-4 md:mb-6">
        <PatternAnalytics />
      </div>
    </>
  );

  const renderDisputesTab = () => (
    <>
      {/* Top Row - 12 KPI Cards (3x4 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
        <StatCard
          title="Active Disputes"
          value="156"
          change="+2.54%"
          changeType="up"
          icon={AlertCircle}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          comparisonText="compared to yesterday"
        />
        <StatCard
          title="Pending Review"
          value="38"
          icon={FileText}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Evidence Under Review"
          value="14"
          icon={Eye}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Resolved Today"
          value="11"
          change="-2.54%"
          changeType="down"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to yesterday"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
        <StatCard
          title="Avg Resolution Time"
          value="4.5 days"
          change="-0.4 days"
          changeType="down"
          icon={Clock}
          iconBgColor="bg-cyan-100"
          iconColor="text-cyan-600"
          comparisonText="compared to last week"
        />
        <StatCard
          title="Dispute Rate"
          value="2.5%"
          change="+2.54%"
          changeType="up"
          icon={TrendingUp}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="compared to last week"
        />
        <StatCard
          title="Mediation Success"
          value="80%"
          icon={Handshake}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Buyer Win Rate"
          value="62%"
          change="+12.54%"
          changeType="up"
          icon={ThumbsUp}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to last week"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
        <StatCard
          title="Seller Win Rate"
          value="28%"
          change="-0.4%"
          changeType="down"
          icon={ThumbsDown}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="compared to last week"
        />
        <StatCard
          title="Urgent Cases"
          value="15"
          change="-0.54%"
          changeType="down"
          icon={AlertTriangle}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          comparisonText="compared to yesterday"
        />
        <StatCard
          title="Escalated Cases"
          value="10"
          icon={TrendingUp}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Total Disputed Value"
          value="$1,079,7628"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Dispute List Table */}
      <div>
        <DisputeListTable disputes={disputes} />
      </div>
    </>
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dispute Resolution</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Monitor and manage dispute resolution processes</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4 md:mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'disputes' && renderDisputesTab()}
    </div>
  );
};

export default DisputeResolution;





