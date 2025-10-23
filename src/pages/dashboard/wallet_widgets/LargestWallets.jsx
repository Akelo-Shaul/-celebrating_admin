import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../shop_widgets/countryUtils'

// Wallets Overview (Largest Wallets)
// Columns: Owner, Country, Wallet Balance ($), Tx Volume
const LargestWallets = ({ wallets = [] }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const rows = (wallets.length ? wallets : [
    { owner: 'Braum Hallabery', handle: '@braum', country: 'Kenya', balance: 1134452.54, txVolume: 34500 },
    { owner: 'Shaul Akelo', handle: '@shaul', country: 'Kenya', balance: 834452.54, txVolume: 24500 },
    { owner: 'Hankue Hue', handle: '@hankue', country: 'Kenya', balance: 624452.54, txVolume: 19500 },
    { owner: 'Paward Chung', handle: '@paward', country: 'Kenya', balance: 504452.54, txVolume: 16500 },
    { owner: 'Hang Turm', handle: '@hang', country: 'Kenya', balance: 404452.54, txVolume: 12500 },
  ]).filter(r => r.owner.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Largest Wallets</h4>
        <div className="flex items-center gap-2">
          <input
            className="rounded-full border px-4 py-1 text-sm w-56 placeholder-gray-500"
            placeholder="Search Owner..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-100 rounded-md px-3 py-2 text-xs text-gray-600 font-medium mb-3 grid grid-cols-[1fr_90px_120px_120px] gap-4 items-center">
        <div>Owner</div>
        <div className="text-center">Country</div>
        <div className="text-right">Wallet Balance ($)</div>
        <div className="text-right">Tx Volume</div>
      </div>

      <div className="max-h-56 overflow-y-auto space-y-2">
        {rows.map((w, i) => (
          <div 
            key={i} 
            className="bg-gray-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/wallet/${encodeURIComponent(w.owner)}`)}
          >
            <div className="grid grid-cols-[1fr_90px_120px_120px] items-center gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700">{w.owner.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis block">{w.owner}</div>
                  <div className="text-xs text-gray-500 truncate">{w.handle}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                {React.createElement(Flags[countryToCode(w.country)], { className: 'w-5 h-3' })}
                <span>{w.country}</span>
              </div>
              <div className="text-right font-medium text-gray-800">{w.balance.toLocaleString()}</div>
              <div className="text-right text-gray-700">{w.txVolume.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LargestWallets






