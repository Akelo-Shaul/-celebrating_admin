import React from 'react'

const TopShopsTable = () => {
  const shops = [
    { name: 'Mtumba Connect', transactions: 1245, revenue: '$180,000', commission: '$32,400', rate: '18%' },
    { name: 'Vintage Finds', transactions: 890, revenue: '$120,000', commission: '$24,000', rate: '20%' },
    { name: 'Urban Threads', transactions: 756, revenue: '$95,000', commission: '$17,100', rate: '18%' },
    { name: 'Handmade Hub', transactions: 634, revenue: '$78,500', commission: '$15,700', rate: '20%' },
    { name: 'Tech Haven', transactions: 523, revenue: '$65,000', commission: '$11,700', rate: '18%' }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Top Revenue-Generating Shops</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Shop Name</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Transactions</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Sales</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Commission Rate</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Commission Earned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shops.map((shop, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{shop.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{shop.transactions}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">{shop.revenue}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{shop.rate}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">{shop.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopShopsTable



