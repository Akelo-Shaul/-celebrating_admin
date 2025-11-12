import React from 'react'
import StreamConnectionForm from './StreamConnectionForm'

const IngestSettings = ({ settings = {}, onChange }) => {
  const handleSave = (payload) => {
    // StreamConnectionForm triggers onSave with ingest defaults; merge into settings
    const next = { ...settings, ingestDefaults: payload }
    onChange && onChange(next)
  }

  return (
    <div>
      <StreamConnectionForm initial={settings.ingestDefaults || {}} onSave={handleSave} />
    </div>
  )
}

export default IngestSettings
