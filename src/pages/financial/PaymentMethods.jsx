import React, { useState } from 'react';
import { SettingsCard, SettingField } from './payment_methods_widgets/SettingsCard';
import PaymentMethodCard from './payment_methods_widgets/PaymentMethodCard';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: 'M-Pesa',
      description: 'Accept mpesa mobile transfers',
      fee: '2.9%',
      processing: 'Instant',
      minAmount: '$10',
      maxAmount: '$500,000'
    },
    {
      id: 2,
      name: 'Airtel Money',
      description: 'Accept airtel money mobile transfers',
      fee: '2.9%',
      processing: 'Instant',
      minAmount: '$10',
      maxAmount: '$500,000'
    },
    {
      id: 3,
      name: 'Credit / Debit Card',
      description: 'Accept major credit and debit cards',
      fee: '2.9%',
      processing: 'Instant',
      minAmount: '$10',
      maxAmount: '$500,000'
    },
    {
      id: 4,
      name: 'Paypal',
      description: 'Paypal digital wallets payments',
      fee: '2.9%',
      processing: 'Instant',
      minAmount: '$10',
      maxAmount: '$500,000'
    },
    {
      id: 5,
      name: 'Bank Transfer',
      description: 'Direct bank accounts transfer',
      fee: '2.9%',
      processing: 'Instant',
      minAmount: '$10',
      maxAmount: '$500,000'
    },
    {
      id: 6,
      name: 'Cryptocurrency',
      description: 'Accept all cryptocurrency under the binance market exchange',
      fee: '2.9%',
      processing: 'Instant',
      minAmount: '$10',
      maxAmount: '$500,000'
    },
    {
      id: 7,
      name: 'Stripe',
      description: 'Accept major credit and debit cards',
      fee: '2.9%',
      processing: 'Instant',
      minAmount: '$10',
      maxAmount: '$500,000'
    }
  ]);

  const handleEditMethod = (method) => {
    console.log('Edit method:', method);
    // Implement edit functionality
  };

  const handleDeleteMethod = (method) => {
    console.log('Delete method:', method);
    // Implement delete functionality
  };

  const handleAddMethod = () => {
    console.log('Add new method');
    // Implement add functionality
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with Save Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Methods</h1>
          <p className="text-gray-600">Configure payment methods and transaction settings</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Save Settings
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Currency Settings */}
          <SettingsCard title="Currency Settings">
            <SettingField
              label="Primary Currency"
              type="dropdown"
              value="USD - US Dollar"
              options={[
                { value: "USD - US Dollar", label: "USD - US Dollar" },
                { value: "EUR - Euro", label: "EUR - Euro" },
                { value: "GBP - British Pound", label: "GBP - British Pound" }
              ]}
            />
            <SettingField
              label="Exchange Rate Update Frequency"
              type="dropdown"
              value="Real-time"
              options={[
                { value: "Real-time", label: "Real-time" },
                { value: "Hourly", label: "Hourly" },
                { value: "Daily", label: "Daily" }
              ]}
            />
          </SettingsCard>

          {/* Limit & Restrictions */}
          <SettingsCard title="Limit & Restrictions">
            <SettingField
              label="Daily Withdrawal Limit ($)"
              value="100,000"
            />
            <SettingField
              label="Monthly Deposit Limit ($)"
              value="10 M"
            />
            <SettingField
              label="Minimum Transaction Amount ($)"
              value="20"
            />
            <SettingField
              label="Maximum Daily Transactions ($)"
              value="10"
            />
          </SettingsCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Transaction Fees */}
          <SettingsCard title="Transaction Fees">
            <SettingField
              label="Deposit Fee (%)"
              value="2.5"
            />
            <SettingField
              label="Withdrawal Fee (%)"
              value="1.5"
            />
            <SettingField
              label="Escrow Fee (%)"
              value="1.5"
            />
            <SettingField
              label="Bookings Fee (%)"
              value="1.5"
            />
            <SettingField
              label="Ticket Purchase Fee (%)"
              value="1.5"
            />
          </SettingsCard>

          {/* Security Settings */}
          <SettingsCard title="Security Settings">
            <SettingField
              label="Enable two-factor authentication"
              type="checkbox"
              value={true}
            />
            <SettingField
              label="Automatically freeze flagged accounts"
              type="checkbox"
              value={true}
            />
            <SettingField
              label="Send alerts for large transactions"
              type="checkbox"
              value={true}
            />
          </SettingsCard>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Payment Methods</h2>
          <button
            onClick={handleAddMethod}
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Method</span>
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onEdit={handleEditMethod}
              onDelete={handleDeleteMethod}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;








