import React from 'react'
import StatCard from '../../../components/common/StatCard'

const AuthenticityMetrics = ({ summary }) => {
  const data = summary || {
    authenticityScore: 87,
    suspiciousReviews: 124,
    flaggedAccounts: 32,
    autoFlags: 78
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Authenticity Metrics</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Authenticity Score"
          value={`${data.authenticityScore}%`}
          subtitle="Higher is better"
          icon={null}
          bgColor="bg-white"
        />

        <StatCard
          title="Suspicious Reviews"
          value={data.suspiciousReviews}
          subtitle="Requires review"
          icon={null}
          bgColor="bg-white"
        />

        <StatCard
          title="Flagged Accounts"
          value={data.flaggedAccounts}
          subtitle="Under investigation"
          icon={null}
          bgColor="bg-white"
        />

        <StatCard
          title="Automated Flags"
          value={data.autoFlags}
          subtitle="System-detected"
          icon={null}
          bgColor="bg-white"
        />
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Signals</h4>
        <div className="space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded overflow-hidden">
            <div className="h-2 bg-yellow-400" style={{ width: `${Math.min(100, data.authenticityScore)}%` }} />
          </div>
          <p className="text-xs text-gray-500">Authenticity score trend (sample)</p>
        </div>
      </div>
    </div>
  )
}

export default AuthenticityMetrics
