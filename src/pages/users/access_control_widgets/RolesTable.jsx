import React, { useState } from 'react'
import { Shield, Edit, Trash2, Plus, Search, Filter } from 'lucide-react'
import StandardTable from '../../../components/common/StandardTable'

const RolesTable = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      users: 5,
      permissions: 48,
      status: 'active',
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Administrative access to most features',
      users: 19,
      permissions: 42,
      status: 'active',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 3,
      name: 'Moderator',
      description: 'Content moderation and user management',
      users: 156,
      permissions: 28,
      status: 'active',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 4,
      name: 'Celebrity',
      description: 'Celebrity verification and special features',
      users: 45230,
      permissions: 18,
      status: 'active',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 5,
      name: 'Shop Owner',
      description: 'Shop management and sales features',
      users: 67890,
      permissions: 22,
      status: 'active',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 6,
      name: 'Member',
      description: 'Standard user access',
      users: 111234,
      permissions: 12,
      status: 'active',
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: 7,
      name: 'Guest',
      description: 'Limited read-only access',
      users: 0,
      permissions: 3,
      status: 'active',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 8,
      name: 'Support Agent',
      description: 'Customer support and ticket management',
      users: 45,
      permissions: 20,
      status: 'active',
      color: 'bg-indigo-100 text-indigo-800'
    }
  ]

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = ['Role Name', 'Description', 'Users', 'Permissions', 'Status', 'Actions']

  const renderRow = (role, index) => (
    <tr key={role.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className={`${role.color} p-2 rounded-lg`}>
            <Shield size={18} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{role.name}</div>
            <div className="text-xs text-gray-500">ID: {role.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-700 max-w-xs">{role.description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">{role.users.toLocaleString()}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">{role.permissions}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          role.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
            <Edit size={16} />
          </button>
          <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Roles Management</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              <span>Add Role</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <StandardTable
        title=""
        columns={columns}
        data={filteredRoles}
        renderRow={renderRow}
        showSearch={false}
        showFilter={false}
        maxHeight="600px"
      />
    </div>
  )
}

export default RolesTable

