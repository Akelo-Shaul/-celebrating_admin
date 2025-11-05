import React, { useState, useEffect } from 'react'
import { X, User, Shield, Calendar, UserCheck } from 'lucide-react'

const AssignRoleModal = ({ isOpen, onClose, user, roles, onSave }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    role: '',
    assignedBy: 'Current Admin'
  })

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.user || '',
        email: user.email || '',
        role: user.role || '',
        assignedBy: user.assignedBy || 'Current Admin'
      })
    } else {
      setFormData({
        userName: '',
        email: '',
        role: '',
        assignedBy: 'Current Admin'
      })
    }
  }, [user, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.userName || !formData.role) {
      alert('Please fill in all required fields')
      return
    }
    onSave(formData)
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      userName: '',
      email: '',
      role: '',
      assignedBy: 'Current Admin'
    })
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {user ? 'Edit Role Assignment' : 'Assign Role'}
          </h3>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  User Name <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter user name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="user@example.com"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  Role <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Select a role</option>
                {roles && roles.map((role) => (
                  <option key={role.id || role.name} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigned By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <UserCheck size={16} />
                  Assigned By
                </div>
              </label>
              <input
                type="text"
                value={formData.assignedBy}
                onChange={(e) => setFormData({ ...formData, assignedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Admin name"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {user ? 'Update Assignment' : 'Assign Role'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AssignRoleModal

