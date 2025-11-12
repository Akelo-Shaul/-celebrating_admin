import React from 'react'

const RecordingSettings = ({ settings = {}, onChange }) => {
  const s = { enableRecording: true, autoArchive: true, retentionDays: 30, enableDVR: true, ...settings }

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h4 className="text-md font-semibold mb-3">Recording & Archiving</h4>

      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={!!s.enableRecording} onChange={e => onChange && onChange({ ...s, enableRecording: e.target.checked })} />
          <span className="text-sm">Enable Server-side Recording</span>
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={!!s.autoArchive} onChange={e => onChange && onChange({ ...s, autoArchive: e.target.checked })} />
          <span className="text-sm">Auto-archive recordings</span>
        </label>

        <div>
          <label className="block text-sm text-gray-600">Archive retention (days)</label>
          <input type="number" value={s.retentionDays} onChange={e => onChange && onChange({ ...s, retentionDays: Number(e.target.value) })} className="mt-1 w-full border rounded px-2 py-1" />
        </div>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={!!s.enableDVR} onChange={e => onChange && onChange({ ...s, enableDVR: e.target.checked })} />
          <span className="text-sm">Enable DVR (rewind/time-shift)</span>
        </label>
      </div>
    </div>
  )
}

export default RecordingSettings
