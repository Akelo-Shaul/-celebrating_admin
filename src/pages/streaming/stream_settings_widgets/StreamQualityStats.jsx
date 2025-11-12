import React from 'react'

const StatTile = ({ label, value, note }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 h-28 flex flex-col items-center justify-center text-center">
    <div className="text-sm text-gray-600 mb-2">{label}</div>
    <div className="text-2xl font-extrabold text-gray-900 leading-tight">
      {typeof value === 'number' ? value.toLocaleString() : value}
    </div>
    {note && <div className="text-xs text-gray-500 mt-1">{note}</div>}
  </div>
)

const StreamQualityStats = ({ stats }) => {
  const s = stats || { viewers: 1240, bitrate: '4.5 Mbps', droppedFrames: 12, uptime: '2h 14m' }

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Stream Quality</h3>

      <div className="grid grid-cols-2 gap-3">
        <StatTile label="Current Viewers" value={s.viewers} note="Live viewers" />

        <StatTile label="Bitrate" value={s.bitrate} note="Outbound" />

        <StatTile label="Dropped Frames" value={s.droppedFrames} note="Since start" />

        <StatTile label="Uptime" value={s.uptime} note="Stream uptime" />
      </div>
    </div>
  )
}

export default StreamQualityStats
