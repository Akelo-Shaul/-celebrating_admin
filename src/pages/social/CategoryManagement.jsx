import React, { useState } from 'react'
import StatCard from '../../components/common/StatCard'
import CategoryForm from './category_management_widgets/CategoryForm'
import CategoryListTable from './category_list_widgets/CategoryListTable'

const CategoryManagement = () => {
  const [editing, setEditing] = useState(null)

  const handleSave = (payload) => {
    // TODO: hook to API to create/update category
    console.log('save category', payload)
    setEditing(null)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
        <p className="text-gray-600 mt-1">Create, edit and organize categories used across the site</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <CategoryListTable />
        </div>

        <div className="lg:col-span-1">
          <CategoryForm initial={editing} onSave={handleSave} />
        </div>
      </div>
    </div>
  )
}

export default CategoryManagement
