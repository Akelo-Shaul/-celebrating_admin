import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import WithdrawalRequestsTable from './withdrawal_requests_widgets/WithdrawalRequestsTable'

const WithdrawalRequests = () => {
  const navigate = useNavigate()

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Requests</h1>
        <p className="text-gray-600">Manage and process user withdrawal requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Pending Requests"
          value="47"
          subtitle="awaiting approval"
          change="+8"
          changeType="up"
          icon={Clock}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          comparisonText="compared to yesterday"
        />
        <StatCard
          title="Total Amount Pending"
          value="$284,500"
          subtitle="in pending withdrawals"
          change="+12.5%"
          changeType="up"
          icon={DollarSign}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="compared to last week"
        />
        <StatCard
          title="Approved Today"
          value="23"
          subtitle="requests approved"
          change="+15"
          changeType="up"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to yesterday"
        />
        <StatCard
          title="Rejected Today"
          value="5"
          subtitle="requests rejected"
          change="-2"
          changeType="down"
          icon={XCircle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="compared to yesterday"
        />
      </div>

      {/* Withdrawal Requests Table */}
      <WithdrawalRequestsTable navigate={navigate} />
    </div>
  )
}

export default WithdrawalRequests

