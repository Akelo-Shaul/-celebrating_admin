import React from 'react';

const DisputeListTable = ({ disputes }) => {
  const columns = [
    '',
    'Escrow Id',
    'Filed On',
    'Complainant',
    'Respondent',
    'Amount ($)',
    'Status',
    'Age',
    'Assigned To'
  ];

  // Sample data matching the image
  const sampleDisputes = disputes && disputes.length > 0 ? disputes : [
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

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status.type) {
      case 'evidence':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'investigation':
        return `${baseClasses} bg-pink-100 text-pink-800`;
      case 'mediation':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Dispute List</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Dispute..."
                className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <svg
                className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleDisputes.map((dispute, index) => (
              <tr key={dispute.id} className={`${dispute.rowColor} hover:bg-opacity-80`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{dispute.escrowId}</div>
                    <div className="text-sm text-gray-500">{dispute.issue}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dispute.filedOn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {dispute.complainant.avatar}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{dispute.complainant.name}</div>
                      <div className="text-sm text-gray-500">{dispute.complainant.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {dispute.respondent.avatar}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{dispute.respondent.name}</div>
                      <div className="text-sm text-gray-500">{dispute.respondent.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${dispute.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(dispute.status)}>
                    {dispute.status.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dispute.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {dispute.assignedTo.avatar}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{dispute.assignedTo.name}</div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Priority Legend */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-end space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-600">High Priority</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-gray-600">Urgent</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-xs text-gray-600">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeListTable;
