import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, DollarSign, Shield } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import CompletedEscrowsTable from './completed_escrows_widgets/CompletedEscrowsTable';

const CompletedEscrows = () => {
  const [escrows, setEscrows] = useState([]);

  // Sample data for completed escrows
  useEffect(() => {
    const sampleData = [
      {
        id: 101,
        escrowId: "ESC-2025-0711234",
        completionDate: "2025-10-28",
        buyer: { name: "Alice Johnson", handle: "@alice" },
        seller: { name: "Bob Williams", handle: "@bob" },
        product: { name: "Custom Artwork" },
        amount: 1200,
        status: { text: "Completed", type: "completed" },
      },
      {
        id: 102,
        escrowId: "ESC-2025-0711235",
        completionDate: "2025-10-27",
        buyer: { name: "Charlie Brown", handle: "@charlie" },
        seller: { name: "Diana Miller", handle: "@diana" },
        product: { name: "Social Media Consultation" },
        amount: 850,
        status: { text: "Completed", type: "completed" },
      },
      {
        id: 103,
        escrowId: "ESC-2025-0711236",
        completionDate: "2025-10-26",
        buyer: { name: "Eve Davis", handle: "@eve" },
        seller: { name: "Frank White", handle: "@frank" },
        product: { name: "Exclusive Video Content" },
        amount: 2500,
        status: { text: "Refunded", type: "refunded" },
      },
      {
        id: 104,
        escrowId: "ESC-2025-0711237",
        completionDate: "2025-10-25",
        buyer: { name: "Grace Lee", handle: "@grace" },
        seller: { name: "Henry Moore", handle: "@henry" },
        product: { name: "Live Stream Ticket" },
        amount: 50,
        status: { text: "Completed", type: "completed" },
      },
    ];
    setEscrows(sampleData);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Completed Escrows</h1>
        <p className="text-gray-600 mt-1">Review completed and refunded escrow transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Completed"
          value="1,890"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Refunded"
          value="124"
          icon={XCircle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatCard
          title="Total Volume"
          value="$8.9M"
          icon={DollarSign}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Success Rate"
          value="93.8%"
          icon={Shield}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      <div>
        <CompletedEscrowsTable escrows={escrows} />
      </div>
    </div>
  );
};

export default CompletedEscrows;
