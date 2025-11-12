import React from 'react'

const CDNSettings = ({ settings = {}, onChange }) => {
  const s = { provider: 'cloudfront', multiCdn: false, primaryRegion: 'us-east-1', hlsSegmentDuration: 6, ...settings }

  const setProvider = (v) => onChange && onChange({ ...s, provider: v })

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h4 className="text-md font-semibold mb-3">CDN & Delivery</h4>

      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600">CDN Provider</label>
          <select value={s.provider} onChange={e => setProvider(e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
            <option value="cloudfront">Amazon CloudFront</option>
            <option value="akamai">Akamai</option>
            <option value="fastly">Fastly</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={!!s.multiCdn} onChange={e => onChange && onChange({ ...s, multiCdn: e.target.checked })} />
          <span className="text-sm">Enable multi-CDN failover</span>
        </label>

        <div>
          <label className="block text-sm text-gray-600">Primary Region</label>
          <input value={s.primaryRegion} onChange={e => onChange && onChange({ ...s, primaryRegion: e.target.value })} className="mt-1 w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">HLS segment duration (s)</label>
          <input type="number" value={s.hlsSegmentDuration} onChange={e => onChange && onChange({ ...s, hlsSegmentDuration: Number(e.target.value) })} className="mt-1 w-full border rounded px-2 py-1" />
        </div>
      </div>
    </div>
  )
}

export default CDNSettings
