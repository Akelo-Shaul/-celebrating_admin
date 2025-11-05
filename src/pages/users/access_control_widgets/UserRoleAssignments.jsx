import React, { useState, useMemo } from 'react'
import { User, Shield, Edit, Trash2, Plus, Search, Filter, ChevronUp, Eye, UserCog, Ban, CheckCircle, Bell, MessageCircle } from 'lucide-react'
import ContextMenu from '../../../components/common/ContextMenu'
import AssignRoleModal from './AssignRoleModal'
import { useMessaging } from '../../../contexts/MessagingContext'
import { useNotification } from '../../../contexts/NotificationContext'

const UserRoleAssignments = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [contextMenu, setContextMenu] = useState(null)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()

  const roles = [
    { id: 1, name: 'Super Admin', description: 'Full system access', color: 'bg-red-100 text-red-800' },
    { id: 2, name: 'Admin', description: 'Administrative access', color: 'bg-orange-100 text-orange-800' },
    { id: 3, name: 'Moderator', description: 'Content moderation', color: 'bg-blue-100 text-blue-800' },
    { id: 4, name: 'Celebrity', description: 'Celebrity features', color: 'bg-purple-100 text-purple-800' },
    { id: 5, name: 'Shop Owner', description: 'Shop management', color: 'bg-green-100 text-green-800' },
    { id: 6, name: 'Member', description: 'Standard access', color: 'bg-gray-100 text-gray-800' },
    { id: 7, name: 'Support Agent', description: 'Customer support', color: 'bg-indigo-100 text-indigo-800' }
  ]

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      user: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Super Admin',
      assignedDate: '2024-01-10',
      assignedBy: 'System',
      status: 'active',
      roleColor: 'bg-red-100 text-red-800'
    },
    {
      id: 2,
      user: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Admin',
      assignedDate: '2024-01-12',
      assignedBy: 'John Doe',
      status: 'active',
      roleColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      email: 'mike.j@example.com',
      role: 'Moderator',
      assignedDate: '2024-01-08',
      assignedBy: 'Jane Smith',
      status: 'active',
      roleColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 4,
      user: 'Sarah Williams',
      email: 'sarah.w@example.com',
      role: 'Support Agent',
      assignedDate: '2024-01-14',
      assignedBy: 'John Doe',
      status: 'active',
      roleColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 5,
      user: 'Tom Brown',
      email: 'tom.b@example.com',
      role: 'Celebrity',
      assignedDate: '2024-01-05',
      assignedBy: 'Auto System',
      status: 'active',
      roleColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 6,
      user: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'Shop Owner',
      assignedDate: '2024-01-11',
      assignedBy: 'Mike Johnson',
      status: 'active',
      roleColor: 'bg-green-100 text-green-800'
    },
    {
      id: 7,
      user: 'David Wilson',
      email: 'david.w@example.com',
      role: 'Moderator',
      assignedDate: '2024-01-09',
      assignedBy: 'Jane Smith',
      status: 'suspended',
      roleColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 8,
      user: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      role: 'Admin',
      assignedDate: '2024-01-13',
      assignedBy: 'John Doe',
      status: 'active',
      roleColor: 'bg-orange-100 text-orange-800'
    }
  ])

  const filteredAssignments = useMemo(() => {
    if (!searchTerm) {
      return assignments
    }
    const searchLower = searchTerm.toLowerCase()
    return assignments.filter(assignment => {
      const userMatch = assignment.user.toLowerCase().includes(searchLower)
      const emailMatch = assignment.email.toLowerCase().includes(searchLower)
      const roleMatch = assignment.role.toLowerCase().includes(searchLower)
      return userMatch || emailMatch || roleMatch
    })
  }, [assignments, searchTerm])

  const handleContextMenu = (e, assignment) => {
    e.preventDefault()
    setContextMenu({
      position: { x: e.clientX, y: e.clientY },
      assignment
    })
  }

  const handleAction = (action, assignment) => {
    switch (action) {
      case 'view':
        alert(`Viewing details for user: ${assignment.user}`)
        break
      case 'edit':
        setSelectedUser(assignment)
        setIsAssignModalOpen(true)
        break
      case 'changeRole':
        setSelectedUser(assignment)
        setIsAssignModalOpen(true)
        break
      case 'message':
        openMessage(assignment)
        break
      case 'notify':
        openNotification(assignment)
        break
      case 'suspend':
        if (window.confirm(`Are you sure you want to suspend ${assignment.user}?`)) {
          setAssignments(assignments.map(a => 
            a.id === assignment.id 
              ? { ...a, status: 'suspended' }
              : a
          ))
          alert(`User "${assignment.user}" has been suspended`)
        }
        break
      case 'activate':
        setAssignments(assignments.map(a => 
          a.id === assignment.id 
            ? { ...a, status: 'active' }
            : a
        ))
        alert(`User "${assignment.user}" has been activated`)
        break
      case 'removeRole':
        if (window.confirm(`Are you sure you want to remove the role from ${assignment.user}?`)) {
          setAssignments(assignments.filter(a => a.id !== assignment.id))
          alert(`Role removed from "${assignment.user}"`)
        }
        break
      default:
        break
    }
    setContextMenu(null)
  }

  const handleAssignRole = () => {
    setSelectedUser(null)
    setIsAssignModalOpen(true)
  }

  const handleEditAssignment = (assignment) => {
    setSelectedUser(assignment)
    setIsAssignModalOpen(true)
  }

  const handleDeleteAssignment = (assignment) => {
    if (window.confirm(`Are you sure you want to remove the role assignment for ${assignment.user}?`)) {
      setAssignments(assignments.filter(a => a.id !== assignment.id))
      alert(`Role assignment removed for "${assignment.user}"`)
    }
  }

  const handleSaveAssignment = (data) => {
    if (selectedUser) {
      // Update existing assignment
      setAssignments(assignments.map(a => 
        a.id === selectedUser.id 
          ? { 
              ...a, 
              user: data.userName,
              email: data.email || a.email,
              role: data.role,
              assignedDate: new Date().toISOString().split('T')[0],
              assignedBy: data.assignedBy,
              roleColor: roles.find(r => r.name === data.role)?.color || a.roleColor
            }
          : a
      ))
      alert(`Role "${data.role}" assigned to "${data.userName}" successfully`)
    } else {
      // Create new assignment
      const newAssignment = {
        id: Math.max(...assignments.map(a => a.id), 0) + 1,
        user: data.userName || 'New User',
        email: data.email || `${data.userName?.toLowerCase().replace(' ', '.')}@example.com`,
        role: data.role,
        assignedDate: new Date().toISOString().split('T')[0],
        assignedBy: data.assignedBy,
        status: 'active',
        roleColor: roles.find(r => r.name === data.role)?.color || 'bg-gray-100 text-gray-800'
      }
      setAssignments([...assignments, newAssignment])
      alert(`Role "${data.role}" assigned successfully`)
    }
    setIsAssignModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">User Role Assignments</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button 
              onClick={handleAssignRole}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span>Assign Role</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Assigned Date
                  <ChevronUp size={14} className="text-gray-500" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Assigned By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Actions
                  <ChevronUp size={14} className="text-gray-500" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssignments.map((assignment) => (
              <tr 
                key={assignment.id} 
                className="hover:bg-gray-50"
                onContextMenu={(e) => handleContextMenu(e, assignment)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{assignment.user}</div>
                      <div className="text-xs text-gray-500">{assignment.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${assignment.roleColor}`}>
                    <Shield size={12} className="mr-1" />
                    {assignment.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{assignment.assignedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{assignment.assignedBy}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    assignment.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditAssignment(assignment)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteAssignment(assignment)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          header={{
            title: contextMenu.assignment.user,
            subtitle: contextMenu.assignment.role
          }}
          items={[
            {
              label: 'View User Details',
              icon: Eye,
              iconColor: 'text-blue-600',
              onClick: () => handleAction('view', contextMenu.assignment)
            },
            {
              label: 'Change Role',
              icon: UserCog,
              iconColor: 'text-blue-600',
              onClick: () => handleAction('changeRole', contextMenu.assignment)
            },
            {
              label: 'Edit Assignment',
              icon: Edit,
              iconColor: 'text-gray-700',
              onClick: () => handleAction('edit', contextMenu.assignment)
            },
            {
              label: 'Message User',
              icon: MessageCircle,
              iconColor: 'text-blue-600',
              onClick: () => handleAction('message', contextMenu.assignment)
            },
            {
              label: 'Send Notification',
              icon: Bell,
              iconColor: 'text-purple-600',
              onClick: () => handleAction('notify', contextMenu.assignment)
            },
            ...(contextMenu.assignment.status !== 'suspended' ? [{
              label: 'Suspend User',
              icon: Ban,
              iconColor: 'text-red-600',
              onClick: () => handleAction('suspend', contextMenu.assignment)
            }] : [{
              label: 'Activate User',
              icon: CheckCircle,
              iconColor: 'text-green-600',
              onClick: () => handleAction('activate', contextMenu.assignment)
            }]),
            {
              label: 'Remove Role Assignment',
              icon: Trash2,
              iconColor: 'text-red-600',
              onClick: () => handleAction('removeRole', contextMenu.assignment)
            }
          ]}
          onOutsideClick={() => setContextMenu(null)}
        />
      )}

      {/* Assign Role Modal */}
      <AssignRoleModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        roles={roles}
        onSave={handleSaveAssignment}
      />
    </div>
  )
}

export default UserRoleAssignments

