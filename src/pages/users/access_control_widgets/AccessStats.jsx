import React from 'react'
import { Shield, Lock, UserCheck, Clock, AlertCircle } from 'lucide-react'

const AccessStats = () => {
  const stats = [
    {
      label: 'Admin Users',
      value: '24',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Moderators',
      value: '156',
      icon: Lock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Verified Users',
      value: '45,892',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Pending Approval',
      value: '12',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'Restricted Users',
      value: '8',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Access Statistics</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{stat.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AccessStats

