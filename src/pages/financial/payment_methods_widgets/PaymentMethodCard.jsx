import React from 'react';

const PaymentMethodCard = ({ method, onEdit, onDelete }) => {
  const getIcon = (methodName) => {
    switch (methodName.toLowerCase()) {
      case 'm-pesa':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'airtel money':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'credit / debit card':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'paypal':
        return (
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
        );
      case 'bank transfer':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'cryptocurrency':
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case 'stripe':
        return (
          <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
    }
  };

  return (
  <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Main Content */}
        <div className="flex items-start md:items-center space-x-3 md:space-x-4 flex-1">
          <div className="flex-shrink-0 mt-1 md:mt-0">
            {getIcon(method.name)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 truncate">{method.name}</h4>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                Active
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{method.description}</p>

            {/* Responsive Grid for Details */}
            <div className="grid grid-cols-2 md:flex md:items-center md:space-x-6 gap-2 md:gap-0 text-xs text-gray-500">
              <div>
                <span className="text-gray-400 block md:inline">Fee</span>
                <span className="ml-0 md:ml-1 font-medium block md:inline">{method.fee}</span>
              </div>
              <div>
                <span className="text-gray-400 block md:inline">Processing</span>
                <span className="ml-0 md:ml-1 font-medium block md:inline">{method.processing}</span>
              </div>
              <div>
                <span className="text-gray-400 block md:inline">Min Amount</span>
                <span className="ml-0 md:ml-1 font-medium block md:inline">{method.minAmount}</span>
              </div>
              <div>
                <span className="text-gray-400 block md:inline">Max Amount</span>
                <span className="ml-0 md:ml-1 font-medium block md:inline">{method.maxAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          <button
            onClick={() => onEdit(method)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Edit payment method"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(method)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Delete payment method"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;









