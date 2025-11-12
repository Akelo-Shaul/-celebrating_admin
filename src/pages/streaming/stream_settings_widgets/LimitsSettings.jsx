import React from 'react'

const LimitsSettings = ({ settings = {}, onChange }) => {
  const s = { maxConcurrentStreamsPerAccount: 5, maxViewersPerStream: 100000, maxBitratePerStream: 8000, ...settings }

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h4 className="text-md font-semibold mb-3">Limits & Quotas</h4>

      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600">Max concurrent streams per account</label>
          <input type="number" value={s.maxConcurrentStreamsPerAccount} onChange={e => onChange && onChange({ ...s, maxConcurrentStreamsPerAccount: Number(e.target.value) })} className="mt-1 w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Max viewers per stream</label>
          <input type="number" value={s.maxViewersPerStream} onChange={e => onChange && onChange({ ...s, maxViewersPerStream: Number(e.target.value) })} className="mt-1 w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Max bitrate per stream (kbps)</label>
          <input type="number" value={s.maxBitratePerStream} onChange={e => onChange && onChange({ ...s, maxBitratePerStream: Number(e.target.value) })} className="mt-1 w-full border rounded px-2 py-1" />
        </div>
      </div>
    </div>
  )
}

export default LimitsSettings
