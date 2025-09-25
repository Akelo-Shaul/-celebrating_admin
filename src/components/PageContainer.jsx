import React from 'react'

const PageContainer = ({ title }) => {
  return (
    <div className="flex items-center justify-center p-8 h-full">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
  )
}

export default PageContainer