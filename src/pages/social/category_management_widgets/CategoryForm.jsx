import React, { useState, useEffect } from 'react'

const CategoryForm = ({ initial = null, onSave }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [parent, setParent] = useState('')
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (initial) {
      setName(initial.name || '')
      setDescription(initial.description || '')
      setParent(initial.parent || '')
      setActive(initial.active !== undefined ? initial.active : true)
    }
  }, [initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { name, description, parent, active }
    if (onSave) onSave(payload)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{initial ? 'Edit Category' : 'Create Category'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Parent Category</label>
          <input value={parent} onChange={e => setParent(e.target.value)} className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200" />
        </div>

        <div className="flex items-center gap-3">
          <input id="active" type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} className="rounded" />
          <label htmlFor="active" className="text-sm text-gray-700">Active</label>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <button type="button" onClick={() => { setName(''); setDescription(''); setParent(''); setActive(true) }} className="px-4 py-2 bg-gray-100 rounded-md">Reset</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">{initial ? 'Save Changes' : 'Create'}</button>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
