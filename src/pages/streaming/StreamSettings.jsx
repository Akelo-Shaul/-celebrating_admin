import React, { useState } from 'react'
import { Save } from 'lucide-react'
import IngestSettings from './stream_settings_widgets/IngestSettings'
import TranscodeSettings from './stream_settings_widgets/TranscodeSettings'
import RecordingSettings from './stream_settings_widgets/RecordingSettings'
import SecuritySettings from './stream_settings_widgets/SecuritySettings'
import LimitsSettings from './stream_settings_widgets/LimitsSettings'
import CDNSettings from './stream_settings_widgets/CDNSettings'
import StreamQualityStats from './stream_settings_widgets/StreamQualityStats'

const StreamSettings = () => {
  const [settings, setSettings] = useState({
    ingestDefaults: {},
    transcode: {},
    recording: {},
    security: {},
    limits: {},
    cdn: {}
  })

  const handleSave = () => {
    // Persist global streaming settings
    console.log('Saving global stream settings:', settings)
    alert('Stream settings saved successfully!')
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 md:mb-6">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Stream Settings</h1>
          <p className="text-sm md:text-base text-gray-600">Configure global streaming defaults, limits, transcoding and delivery options.</p>
        </div>

        <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-5 py-2 rounded flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap">
          <Save size={16} />
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="space-y-4 md:space-y-6">
          <IngestSettings settings={settings.ingestDefaults} onChange={(v) => setSettings(s => ({ ...s, ingestDefaults: v }))} />
          <TranscodeSettings settings={settings.transcode} onChange={(v) => setSettings(s => ({ ...s, transcode: v }))} />
          <RecordingSettings settings={settings.recording} onChange={(v) => setSettings(s => ({ ...s, recording: v }))} />
        </div>

        <div className="space-y-4 md:space-y-6">
          <SecuritySettings settings={settings.security} onChange={(v) => setSettings(s => ({ ...s, security: v }))} />
          <LimitsSettings settings={settings.limits} onChange={(v) => setSettings(s => ({ ...s, limits: v }))} />
          <CDNSettings settings={settings.cdn} onChange={(v) => setSettings(s => ({ ...s, cdn: v }))} />

          {/* Right column small status widget */}
          <StreamQualityStats />
        </div>
      </div>
    </div>
  )
}

export default StreamSettings
