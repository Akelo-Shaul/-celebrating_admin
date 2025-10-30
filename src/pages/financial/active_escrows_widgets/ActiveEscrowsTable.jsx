import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextMenu from '../../../components/common/ContextMenu';
import { Eye, FileText, User, Shield, AlertTriangle, MessageCircle, Bell } from 'lucide-react';
import { useMessaging } from '../../../contexts/MessagingContext';
import { useNotification } from '../../../contexts/NotificationContext';

const ActiveEscrowsTable = ({ escrows }) => {
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState(null);
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()

  const handleContextMenu = useCallback((event, escrow) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.clientX, y: event.clientY },
      escrow: escrow,
    });
  }, []);

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const columns = [
    '',
    'Escrow Id',
    'Buyer',
    'Seller',
    'Product',
    'Amount',
    'Status',
    'Age',
    'Release In'
  ];

  const sampleEscrows = escrows && escrows.length > 0 ? escrows : [];

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status.type) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'disputed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'pending':
        return `${baseClasses} bg-gray-100 text-gray-800 flex items-center space-x-1`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const menuItems = (
    contextMenu ? [
      { label: 'View Escrow Details', icon: Eye, onClick: () => navigate('/active-escrows', { state: { escrowId: contextMenu.escrow.id } }) },
      { label: 'View Transaction', icon: FileText, onClick: () => navigate('/transaction-history', { state: { transactionId: contextMenu.escrow.id, escrowId: contextMenu.escrow.escrowId } }) },
      { label: 'Initiate Dispute', icon: AlertTriangle, onClick: () => navigate('/dispute-resolution', { state: { escrowId: contextMenu.escrow.id } }) },
      { label: 'Message Buyer', icon: MessageCircle, onClick: () => openMessage(contextMenu.escrow.buyer) },
      { label: 'Message Seller', icon: MessageCircle, onClick: () => openMessage(contextMenu.escrow.seller) },
      { label: 'Notify Buyer', icon: Bell, onClick: () => openNotification(contextMenu.escrow.buyer) },
      { label: 'Notify Seller', icon: Bell, onClick: () => openNotification(contextMenu.escrow.seller) },
      { label: 'Buyer Profile', icon: User, onClick: () => navigate(`/profile/${encodeURIComponent(contextMenu.escrow.buyer.handle)}`, { state: { role: 'member' } }) },
      { label: 'Seller Profile', icon: Shield, onClick: () => navigate(`/profile/${encodeURIComponent(contextMenu.escrow.seller.handle)}`, { state: { role: 'member' } }) },
    ] : []
  );

  return (
    <div>
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Active Escrows List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleEscrows.map((escrow) => (
                <tr key={escrow.id} onContextMenu={(e) => handleContextMenu(e, escrow)} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{escrow.escrowId}</div>
                    <div className="text-sm text-gray-500">{escrow.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-3 cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(escrow.buyer.handle)}`)}>
                        <div className="text-sm font-medium text-gray-900">{escrow.buyer.name}</div>
                        <div className="text-sm text-gray-500">{escrow.buyer.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-3 cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(escrow.seller.handle)}`)}>
                        <div className="text-sm font-medium text-gray-900">{escrow.seller.name}</div>
                        <div className="text-sm text-gray-500">{escrow.seller.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{escrow.product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${escrow.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(escrow.status)}>{escrow.status.text}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{escrow.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{escrow.releaseIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {contextMenu && <ContextMenu items={menuItems} position={contextMenu.position} onOutsideClick={closeContextMenu} />}
    </div>
  );
};

export default ActiveEscrowsTable;