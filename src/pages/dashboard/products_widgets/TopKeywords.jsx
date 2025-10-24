import React from 'react'

export default function TopKeywords() {
  const items = ['Stockings','Maserati','Hamburger','Tar','Stockings','Stockings']
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full border border-gray-200">
      <h4 className="font-medium mb-3">Top Search Keywords</h4>
      <ol className="list-decimal list-inside text-sm space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center justify-between">
            <span>{it}</span>
            <span className="text-sm">1,200</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
