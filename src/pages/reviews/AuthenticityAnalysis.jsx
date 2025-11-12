import React from 'react'
import { ShieldOff, AlertCircle } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import AuthenticityMetrics from './authenticity_widgets/AuthenticityMetrics'
import SuspiciousReviewsTable from './authenticity_widgets/SuspiciousReviewsTable'

const AuthenticityAnalysis = () => {
  // placeholder/sample data
  const summary = {
    authenticityScore: 87,
    suspiciousReviews: 124,
    flaggedAccounts: 32,
    autoFlags: 78
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Authenticity Analysis</h1>
        <p className="text-gray-600">Analyze suspicious activity and review authenticity signals across the platform</p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Authenticity Score"
            value={`${summary.authenticityScore}%`}
            subtitle="System confidence"
            icon={ShieldOff}
            iconBgColor="bg-indigo-100"
            iconColor="text-indigo-600"
          />

          <StatCard
            title="Suspicious Reviews"
            value={summary.suspiciousReviews}
            subtitle="Requires review"
            icon={AlertCircle}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />

          <StatCard
            title="Flagged Accounts"
            value={summary.flaggedAccounts}
            subtitle="Under investigation"
            icon={AlertCircle}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
          />

          <StatCard
            title="Automated Flags"
            value={summary.autoFlags}
            subtitle="Machine-detected"
            icon={AlertCircle}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <AuthenticityMetrics summary={summary} />
        </div>

        <div className="col-span-1">
          <SuspiciousReviewsTable />
        </div>
      </div>
    </div>
  )
}

export default AuthenticityAnalysis
