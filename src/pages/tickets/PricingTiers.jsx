import React, { useState } from 'react'
import StandardTable from '../../components/common/StandardTable'

const PricingTiers = () => {
  const [tiers, setTiers] = useState([
    { id: 1, name: 'General Admission', minPrice: 8, maxPrice: 12, currency: '$', benefits: 'Access to venue', quota: 1000 },
    { id: 2, name: 'VIP', minPrice: 45, maxPrice: 75, currency: '$', benefits: 'Priority seating, Backstage pass', quota: 200 },
    { id: 3, name: 'Early Bird', minPrice: 5, maxPrice: 9, currency: '$', benefits: 'Discounted tickets for early buyers', quota: 500 }
  ])

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', minPrice: '', maxPrice: '', currency: '$', benefits: '', quota: '' })

  const handleAdd = (e) => {
    e.preventDefault()
  const next = { ...form, id: Date.now(), minPrice: Number(form.minPrice), maxPrice: Number(form.maxPrice), quota: Number(form.quota) }
    setTiers(t => [next, ...t])
    setForm({ name: '', price: '', currency: '$', benefits: '', quota: '' })
    setShowForm(false)
  }

  const columns = ['Tier', 'Price Range', 'Benefits', 'Quota', 'Actions']

  const renderRow = (tier) => (
    <tr key={tier.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tier.name}</td>
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tier.currency}{tier.minPrice} - {tier.currency}{tier.maxPrice}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tier.benefits}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{tier.quota}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Edit</button>
          <button onClick={() => setTiers(t => t.filter(x => x.id !== tier.id))} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">Delete</button>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Pricing Tiers</h1>
          <p className="text-gray-600">Define ticket pricing tiers and quotas that apply across events.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowForm(s => !s)} className="px-4 py-2 bg-green-600 text-white rounded">{showForm ? 'Cancel' : 'Add Tier'}</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input required placeholder="Tier name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border rounded px-3 py-2" />
            <input required type="number" placeholder="Min price" value={form.minPrice} onChange={e => setForm(f => ({ ...f, minPrice: e.target.value }))} className="border rounded px-3 py-2" />
            <input required type="number" placeholder="Max price" value={form.maxPrice} onChange={e => setForm(f => ({ ...f, maxPrice: e.target.value }))} className="border rounded px-3 py-2" />
            <input placeholder="Currency" value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} className="border rounded px-3 py-2" />
            <input required type="number" placeholder="Quota" value={form.quota} onChange={e => setForm(f => ({ ...f, quota: e.target.value }))} className="border rounded px-3 py-2" />
            <input placeholder="Benefits (comma separated)" value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} className="md:col-span-4 border rounded px-3 py-2" />
          </div>
          <div className="mt-3 flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Tier</button>
          </div>
        </form>
      )}

      <StandardTable
        title="Defined Pricing Tiers"
        columns={columns}
        data={tiers}
        renderRow={(item) => renderRow(item)}
        showFilter={true}
        columnWidths={["25%","10%","45%","10%","10%"]}
      />
    </div>
  )
}

export default PricingTiers
