import React from 'react'

// Small, dependency-free sparkline-style trend component that fits project styles.
const RatingTrend = ({ data }) => {
  // default sample data if none provided
  const values = data || [4.1, 4.2, 4.25, 4.3, 4.35, 4.28, 4.3, 4.33, 4.3, 4.32, 4.3, 4.3]

  const width = 700
  const height = 200
  const padding = 12

  const min = Math.min(...values)
  const max = Math.max(...values)

  const xStep = (width - padding * 2) / Math.max(1, values.length - 1)

  const points = values.map((v, i) => {
    const x = padding + i * xStep
    // invert y: higher value -> lower pixel
    const y = padding + (1 - (v - min) / (max - min || 1)) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44">
        {/* gradient fill under the line */}
        <defs>
          <linearGradient id="rg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* area (approx) using polyline closed to bottom */}
        <polyline
          points={points}
          fill="none"
          stroke="#c7d2fe"
          strokeWidth={0}
        />

        {/* area fill by constructing a path from points */}
        <path
          d={`M ${points.split(' ')[0]} L ${points} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`}
          fill="url(#rg)"
          opacity="0.9"
        />

        {/* line */}
        <polyline
          points={points}
          fill="none"
          stroke="#4f46e5"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* small markers */}
        {values.map((v, i) => {
          const xs = padding + i * xStep
          const ys = padding + (1 - (v - min) / (max - min || 1)) * (height - padding * 2)
          return <circle key={i} cx={xs} cy={ys} r={2.2} fill="#4f46e5" />
        })}
      </svg>

      <div className="mt-2 text-xs text-gray-500">Monthly average rating (sample)</div>
    </div>
  )
}

export default RatingTrend
