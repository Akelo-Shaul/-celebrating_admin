import React from 'react'
import StandardTable from '../../../components/common/StandardTable'

const initials = (s) => {
  if (!s) return ''
  const parts = s.toString().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

const TagListTable = ({ tags }) => {
  const sample = tags && tags.length > 0 ? tags : [
    { id: 't1', tag: '#music', posts: 54000, engagements: 32000, topContributor: 'Braum Hallabery', lastUsed: '2025-11-10' },
    { id: 't2', tag: '#art', posts: 42000, engagements: 27000, topContributor: 'Ava Summers', lastUsed: '2025-11-09' },
    { id: 't3', tag: '#fashion', posts: 28000, engagements: 18000, topContributor: 'Liam Ford', lastUsed: '2025-11-08' },
  ]

  return (
    <StandardTable
      title="Tags"
      columns={["Tag", "Posts", "Engagements", "Top Contributor", "Last Used"]}
      data={sample}
      showFilter={true}
      renderRow={(item) => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 bg-gray-100 rounded-md text-sm font-medium text-gray-800">{item.tag}</div>
            </div>
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.posts.toLocaleString()}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.engagements.toLocaleString()}</td>

          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">{initials(item.topContributor)}</div>
              <div className="text-sm text-gray-700">{item.topContributor}</div>
            </div>
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.lastUsed}</td>
        </tr>
      )}
    />
  )
}

export default TagListTable
