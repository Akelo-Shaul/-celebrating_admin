import React from 'react'

const defaultProfiles = [
  { id: '1080p', label: '1080p (1920x1080)', enabled: true },
  { id: '720p', label: '720p (1280x720)', enabled: true },
  { id: '480p', label: '480p (854x480)', enabled: true },
  { id: '360p', label: '360p (640x360)', enabled: false }
]

const TranscodeSettings = ({ settings = {}, onChange }) => {
  const s = { profiles: defaultProfiles, maxBitrate: 5000, keyframeInterval: 2, ...settings }

  const toggleProfile = (id) => {
    const profiles = s.profiles.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
    onChange && onChange({ ...s, profiles })
  }

  const setMaxBitrate = (v) => onChange && onChange({ ...s, maxBitrate: Number(v) })
  const setKeyframeInterval = (v) => onChange && onChange({ ...s, keyframeInterval: Number(v) })

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h4 className="text-md font-semibold mb-3">Transcoding & Profiles</h4>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {s.profiles.map(p => (
            <label key={p.id} className="flex items-center gap-3 p-2 border rounded">
              <input type="checkbox" checked={!!p.enabled} onChange={() => toggleProfile(p.id)} />
              <span className="text-sm">{p.label}</span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Max Outbound Bitrate (kbps)</label>
            <input type="number" value={s.maxBitrate} onChange={e => setMaxBitrate(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Keyframe Interval (s)</label>
            <input type="number" value={s.keyframeInterval} onChange={e => setKeyframeInterval(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TranscodeSettings
