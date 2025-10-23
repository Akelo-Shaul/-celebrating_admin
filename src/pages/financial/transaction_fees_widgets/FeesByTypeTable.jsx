import React from 'react'

const FeesByTypeTable = () => {
  const fees = [
    {
      type: 'Deposit Fees',
      transactions: '13,245',
      averageFee: '$29.00',
      totalRevenue: '$384,000',
      percentage: '2.9%',
      growth: '+12.5%',
      status: 'active'
    },
    {
      type: 'Withdrawal Fees',
      transactions: '9,931',
      averageFee: '$29.00',
      totalRevenue: '$288,000',
      percentage: '2.9%',
      growth: '+8.3%',
      status: 'active'
    },
    {
      type: 'Escrow Fees',
      transactions: '2,880',
      averageFee: '$50.00',
      totalRevenue: '$144,000',
      percentage: '3.5%',
      growth: '+15.2%',
      status: 'active'
    },
    {
      type: 'Booking Fees',
      transactions: '3,200',
      averageFee: '$30.00',
      totalRevenue: '$96,000',
      percentage: '2.5%',
      growth: '+7.8%',
      status: 'active'
    },
    {
      type: 'Ticket Purchase Fees',
      transactions: '1,920',
      averageFee: '$25.00',
      totalRevenue: '$48,000',
      percentage: '2.0%',
      growth: '+10.3%',
      status: 'active'
    },
    {
      type: 'Payment Processing',
      transactions: '31,176',
      averageFee: '$18.50',
      totalRevenue: '$576,000',
      percentage: '2.5%',
      growth: '+9.1%',
      status: 'active'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Fee Breakdown</h3>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee Type</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Transactions</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Avg Fee</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Fee Rate</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Revenue</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Growth</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fees.map((fee, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{fee.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{fee.transactions}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-center">{fee.averageFee}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{fee.percentage}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">{fee.totalRevenue}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-semibold text-green-600">{fee.growth}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-t-2 border-gray-300">
            <tr>
              <td className="px-6 py-4 text-sm font-bold text-gray-900">Total</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">62,352</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">$30.77</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">2.72%</td>
              <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">$1,536,000</td>
              <td className="px-6 py-4 text-sm font-bold text-green-600 text-center">+10.5%</td>
              <td className="px-6 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default FeesByTypeTable


