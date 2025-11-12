import React, { useState } from 'react'
import { Copy, Eye } from 'lucide-react'

const StreamConnectionForm = ({ initial = {}, onSave }) => {
  const [streamKey, setStreamKey] = useState(initial.streamKey || '')
  const [ingestUrl, setIngestUrl] = useState(initial.ingestUrl || '')
  const [enableLowLatency, setEnableLowLatency] = useState(initial.enableLowLatency || false)
  const [showKey, setShowKey] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { streamKey, ingestUrl, enableLowLatency }
    onSave && onSave(payload)
  }

  const copyStreamKey = async () => {
    try {
      await navigator.clipboard.writeText(streamKey)
    } catch (e) {
      console.warn('Failed to copy stream key', e)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ingest URL</label>
          <input
            value={ingestUrl}
            onChange={e => setIngestUrl(e.target.value)}
            placeholder="rtmp://live.example.com/app"
            className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stream Key</label>
          <div className="mt-1 flex items-center border rounded-md overflow-hidden">
            <input
              value={streamKey}
              onChange={e => setStreamKey(e.target.value)}
              placeholder="live_abc123"
              type={showKey ? 'text' : 'password'}
              className="flex-1 px-3 py-2 focus:outline-none"
            />
            <button type="button" onClick={() => setShowKey(s => !s)} className="px-3 border-l border-gray-200 text-gray-600 hover:bg-gray-50" title={showKey ? 'Hide key' : 'Show key'}>
              <Eye size={16} />
            </button>
            <button type="button" onClick={copyStreamKey} className="px-3 border-l border-gray-200 text-gray-600 hover:bg-gray-50" title="Copy stream key">
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input id="lowlat" type="checkbox" checked={enableLowLatency} onChange={e => setEnableLowLatency(e.target.checked)} className="rounded" />
          <label htmlFor="lowlat" className="text-sm text-gray-700">Enable Low Latency Mode</label>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => { setStreamKey(''); setIngestUrl(''); setEnableLowLatency(false) }} className="px-4 py-2 bg-gray-100 rounded-md">Reset</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save Settings</button>
        </div>
      </form>
    </div>
  )
}

export default StreamConnectionForm
