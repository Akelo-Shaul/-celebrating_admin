import React from 'react'
import StandardTable from '../../../components/common/StandardTable'

// Helper to compute initials from a name string
const initials = (s) => {
  if (!s) return ''
  const parts = s.toString().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

const SuspiciousReviewsTable = ({ data }) => {
  const rows = data || [
    { id: 'r1', entity: 'Celebrity A', type: 'Celebrity', user: 'user_123', rating: 1, reason: 'Burst of negatives' },
    { id: 'r2', entity: 'Store X', type: 'Shop', user: 'user_999', rating: 5, reason: 'Multiple quick reviews' },
    { id: 'r3', entity: 'Product Z', type: 'Product', user: 'user_abc', rating: 2, reason: 'Suspicious text pattern' },
  ]

  return (
    <StandardTable
      title="Suspicious Reviews"
      columns={["Entity", "User", "Rating", "Reason"]}
      data={rows}
      showSearch={false} // hide search in narrow right column to avoid overflow
      showFilter={false}
      columnWidths={["35%","30%","15%","20%"]}
      maxHeight={'420px'}
      renderRow={(item) => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {initials(item.entity)}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.entity}</div>
                <div className="text-xs text-gray-500">Type: {item.type || 'N/A'}</div>
              </div>
            </div>
          </td>

          <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-medium text-sm">
                {initials(item.user)}
              </div>
              <div className="text-sm text-gray-700">{item.user}</div>
            </div>
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.rating}</td>
          <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{item.reason}</td>
        </tr>
      )}
    />
  )
}

export default SuspiciousReviewsTable
