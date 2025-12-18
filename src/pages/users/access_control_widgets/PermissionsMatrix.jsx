import React, { useState } from 'react'
import { Check, X, Search, ChevronDown, ChevronRight, Filter } from 'lucide-react'

const PermissionsMatrix = () => {
  const [expandedCategories, setExpandedCategories] = useState(['Dashboard', 'Users', 'Financial'])
  const [searchTerm, setSearchTerm] = useState('')

  const permissions = [
    {
      category: 'Dashboard',
      items: [
        { name: 'View Dashboard', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Celebrity': true, 'Shop Owner': true, 'Member': true } },
        { name: 'Export Reports', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': false } },
        { name: 'View Analytics', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Celebrity': false } }
      ]
    },
    {
      category: 'Users',
      items: [
        { name: 'View Users', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Celebrity': false, 'Shop Owner': false, 'Member': false } },
        { name: 'Create Users', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': false } },
        { name: 'Edit Users', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true } },
        { name: 'Delete Users', roles: { 'Super Admin': true, 'Admin': false } },
        { name: 'Manage Roles', roles: { 'Super Admin': true, 'Admin': false } }
      ]
    },
    {
      category: 'Financial',
      items: [
        { name: 'View Transactions', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Shop Owner': true } },
        { name: 'Process Payments', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': false } },
        { name: 'Manage Wallets', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': false } },
        { name: 'Approve Withdrawals', roles: { 'Super Admin': true, 'Admin': true } },
        { name: 'View Revenue Reports', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': false } }
      ]
    },
    {
      category: 'Shops',
      items: [
        { name: 'View Shops', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Shop Owner': true, 'Member': true } },
        { name: 'Create Shops', roles: { 'Super Admin': true, 'Admin': true, 'Shop Owner': true } },
        { name: 'Edit Shops', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Shop Owner': true } },
        { name: 'Delete Shops', roles: { 'Super Admin': true, 'Admin': true } },
        { name: 'Approve Shops', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true } }
      ]
    },
    {
      category: 'Content',
      items: [
        { name: 'View Posts', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Celebrity': true, 'Shop Owner': true, 'Member': true } },
        { name: 'Create Posts', roles: { 'Super Admin': true, 'Admin': true, 'Celebrity': true, 'Shop Owner': true, 'Member': true } },
        { name: 'Moderate Content', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true } },
        { name: 'Delete Posts', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true } },
        { name: 'Manage Categories', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': false } }
      ]
    },
    {
      category: 'Events',
      items: [
        { name: 'View Events', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true, 'Celebrity': true, 'Shop Owner': true, 'Member': true } },
        { name: 'Create Events', roles: { 'Super Admin': true, 'Admin': true, 'Celebrity': true } },
        { name: 'Manage Tickets', roles: { 'Super Admin': true, 'Admin': true, 'Celebrity': true } },
        { name: 'Approve Events', roles: { 'Super Admin': true, 'Admin': true, 'Moderator': true } }
      ]
    },
    {
      category: 'Settings',
      items: [
        { name: 'System Settings', roles: { 'Super Admin': true, 'Admin': false } },
        { name: 'Access Control', roles: { 'Super Admin': true, 'Admin': false } },
        { name: 'General Settings', roles: { 'Super Admin': true, 'Admin': true } },
        { name: 'API Management', roles: { 'Super Admin': true, 'Admin': false } }
      ]
    }
  ]

  const roles = ['Super Admin', 'Admin', 'Moderator', 'Celebrity', 'Shop Owner', 'Member']

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredPermissions = permissions.filter(perm =>
    perm.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perm.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">Permissions Matrix</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div className="grid grid-cols-[300px_repeat(6,minmax(100px,1fr))] gap-4 px-6 py-3">
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Permission</div>
              {roles.map((role, index) => (
                <div key={index} className="text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* Permission Rows */}
          <div className="divide-y divide-gray-200">
            {filteredPermissions.map((category, catIndex) => {
              const isExpanded = expandedCategories.includes(category.category)
              return (
                <div key={catIndex}>
                  {/* Category Header */}
                  <div
                    className="bg-gray-100 hover:bg-gray-200 px-6 py-3 cursor-pointer transition-colors"
                    onClick={() => toggleCategory(category.category)}
                  >
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown size={18} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-600" />
                      )}
                      <span className="font-semibold text-gray-900">{category.category}</span>
                      <span className="text-xs text-gray-500">({category.items.length} permissions)</span>
                    </div>
                  </div>

                  {/* Permission Items */}
                  {isExpanded && category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="grid grid-cols-[300px_repeat(6,minmax(100px,1fr))] gap-4 px-6 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-sm text-gray-700">{item.name}</div>
                      {roles.map((role, roleIndex) => {
                        const hasPermission = item.roles[role] || false
                        return (
                          <div key={roleIndex} className="flex justify-center">
                            {hasPermission ? (
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                <Check size={14} className="text-green-600" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                <X size={14} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer Legend */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={14} className="text-green-600" />
            </div>
            <span className="text-xs text-gray-600">Has Permission</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <X size={14} className="text-gray-400" />
            </div>
            <span className="text-xs text-gray-600">No Permission</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermissionsMatrix

