import React from 'react'

const CountryRow = ({ country, value }) => (
  <div className="flex items-center justify-between bg-gray-100 rounded px-3 py-2 mb-2">
    <div className="flex items-center gap-2">
      <img src="/favicon.png" alt="flag" className="w-6 h-6 rounded-full" />
      <div className="text-sm text-gray-800">{country}</div>
    </div>
    <div className="text-sm text-gray-700">{value}</div>
  </div>
)

export default function WalletDistribution() {
  const rows = [
    { country: 'Kenya', value: '1,200 wallets' },
    { country: 'Kenya', value: '1,200 wallets' },
    { country: 'Kenya', value: '1,200 wallets' },
    { country: 'Kenya', value: '1,200 wallets' },
    { country: 'Kenya', value: '1,200 wallets' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full border border-gray-200">
      <h3 className="text-sm font-medium text-gray-800 mb-3">Wallet Distribution</h3>
      {rows.map((r, i) => <CountryRow key={i} {...r} />)}
    </div>
  )
}
