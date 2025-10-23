import React from 'react'

export default function StatCard({ title, value, subtitle, delta, compareText = 'compared to last year', showNow = false }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.633 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <span>{title}</span>
              {showNow && <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />}
            </div>
            <div className="text-2xl font-semibold text-gray-900 mt-2">{value} <span className="text-sm text-gray-600">{subtitle}</span></div>
            <div className="text-xs text-gray-500 mt-1">{compareText}</div>
          </div>
        </div>
        {delta && <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded">+{delta}%</div>}
      </div>
    </div>
  )
}
