import React from 'react'

const SecuritySettings = ({ settings = {}, onChange }) => {
  const s = { requireToken: true, keyRotation: false, rotationIntervalDays: 7, ipAllowlist: '', ...settings }

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h4 className="text-md font-semibold mb-3">Security & Access</h4>

      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={!!s.requireToken} onChange={e => onChange && onChange({ ...s, requireToken: e.target.checked })} />
          <span className="text-sm">Require signed token for ingest (recommended)</span>
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={!!s.keyRotation} onChange={e => onChange && onChange({ ...s, keyRotation: e.target.checked })} />
          <span className="text-sm">Enable periodic stream-key rotation</span>
        </label>

        {s.keyRotation && (
          <div>
            <label className="block text-sm text-gray-600">Rotation interval (days)</label>
            <input type="number" value={s.rotationIntervalDays} onChange={e => onChange && onChange({ ...s, rotationIntervalDays: Number(e.target.value) })} className="mt-1 w-full border rounded px-2 py-1" />
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-600">IP allowlist (comma-separated CIDRs)</label>
          <input value={s.ipAllowlist} onChange={e => onChange && onChange({ ...s, ipAllowlist: e.target.value })} placeholder="e.g. 203.0.113.0/24,198.51.100.5/32" className="mt-1 w-full border rounded px-2 py-1" />
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings
