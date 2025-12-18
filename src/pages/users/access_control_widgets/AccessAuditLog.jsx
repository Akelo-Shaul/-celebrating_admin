import React, { useState } from 'react'
import { Clock, Shield, User, Lock, AlertCircle, CheckCircle, XCircle, Search } from 'lucide-react'

const AccessAuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:32:15',
      user: 'John Doe',
      action: 'Role Assigned',
      target: 'Admin Role',
      status: 'success',
      ip: '192.168.1.100',
      icon: Shield,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:28:42',
      user: 'Jane Smith',
      action: 'Permission Granted',
      target: 'Financial Management',
      status: 'success',
      ip: '192.168.1.101',
      icon: Lock,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:25:18',
      user: 'Mike Johnson',
      action: 'Access Denied',
      target: 'System Settings',
      status: 'failed',
      ip: '192.168.1.102',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:20:05',
      user: 'Sarah Williams',
      action: 'Role Removed',
      target: 'Moderator Role',
      status: 'success',
      ip: '192.168.1.103',
      icon: User,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:15:33',
      user: 'Tom Brown',
      action: 'Permission Revoked',
      target: 'User Management',
      status: 'success',
      ip: '192.168.1.104',
      icon: Lock,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 6,
      timestamp: '2024-01-15 14:10:22',
      user: 'Admin System',
      action: 'Security Alert',
      target: 'Multiple Failed Login Attempts',
      status: 'warning',
      ip: '192.168.1.105',
      icon: AlertCircle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 7,
      timestamp: '2024-01-15 14:05:11',
      user: 'Emily Davis',
      action: 'Role Updated',
      target: 'Celebrity Role',
      status: 'success',
      ip: '192.168.1.106',
      icon: Shield,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 8,
      timestamp: '2024-01-15 14:00:48',
      user: 'David Wilson',
      action: 'Access Granted',
      target: 'Dashboard Analytics',
      status: 'success',
      ip: '192.168.1.107',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  const filteredLogs = auditLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Success
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Failed
          </span>
        )
      case 'warning':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            <AlertCircle size={12} className="mr-1" />
            Warning
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        {/* Mobile Layout: 2 rows */}
        <div className="md:hidden space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Access Audit Log</h2>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>

          {/* Bottom Row: Search Field (Full Width) */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Layout: Title and Filter on top, Search below */}
        <div className="hidden md:block space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Access Audit Log</h2>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>

          {/* Bottom Row: Search Field */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Log List */}
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {filteredLogs.map((log) => {
          const Icon = log.icon
          return (
            <div key={log.id} className="px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3 md:gap-4">
                {/* Icon */}
                <div className={`${log.bgColor} ${log.iconColor} p-2 rounded-lg flex-shrink-0`}>
                  <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-2">
                    {/* Name and Status */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-gray-900">{log.user}</span>
                      {getStatusBadge(log.status)}
                    </div>

                    {/* Action and Target */}
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{log.action}</div>
                      <p className="text-sm text-gray-700">{log.target}</p>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col gap-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>IP:</span>
                        <span className="font-mono">{log.ip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{log.user}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{log.action}</span>
                        </div>
                        <p className="text-sm text-gray-700">{log.target}</p>
                      </div>
                      {getStatusBadge(log.status)}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>IP:</span>
                        <span className="font-mono">{log.ip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600">Showing {filteredLogs.length} of {auditLogs.length} recent logs</p>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccessAuditLog

