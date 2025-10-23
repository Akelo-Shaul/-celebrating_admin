import React, { useState, useMemo } from 'react'
import { countryRankingsData, metrics } from '../data/countryRankingsData'
import Flags from 'country-flag-icons/react/3x2'

const CountryRankings = () => {
  const [selectedMetric, setSelectedMetric] = useState('activeUsers')
  
  const sortedData = useMemo(() => {
    return [...countryRankingsData].sort((a, b) => b[selectedMetric] - a[selectedMetric])
  }, [selectedMetric])

  const maxValue = useMemo(() => {
    return Math.max(...sortedData.map(item => item[selectedMetric]))
  }, [sortedData, selectedMetric])

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const countryToCode = (country) => {
    const mapping = {
      'Kenya': 'KE',
      'Nigeria': 'NG',
      'Ghana': 'GH',
      'Tanzania': 'TZ',
      'Uganda': 'UG'
    }
    return mapping[country] || 'KE'
  }

  return (
    <div className="bg-white rounded-lg p-4 h-full flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Country Rankings</h2>
        <select 
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="px-3 py-1.5 border rounded-lg bg-white text-sm"
        >
          {metrics.map(metric => (
            <option key={metric.id} value={metric.id}>
              {metric.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {sortedData.map(item => {
          const percentage = (item[selectedMetric] / maxValue) * 100
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {React.createElement(Flags[countryToCode(item.country)], { 
                    className: "w-4 h-4"
                  })}
                  <span>{item.country}</span>
                </div>
                <span className="font-medium">{formatNumber(item[selectedMetric])}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CountryRankings