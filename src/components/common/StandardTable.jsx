import React from 'react';

const StandardTable = ({ 
  title, 
  searchPlaceholder = "Search...", 
  columns, 
  data, 
  renderRow, 
  showSearch = true,
  showFilter = true,
  className = "",
  columnWidths = null, // optional array of CSS width strings (e.g. ['60%','40%'])
  maxHeight = null // optional max height for scrollable table body (e.g. '400px')
}) => {
  return (
    <div className={`bg-white rounded-lg shadow ${className} flex flex-col h-full`}>
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {(showSearch || showFilter) && (
            <div className="flex items-center space-x-4">
              {showSearch && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
                  />
                  <svg
                    className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              )}
              {showFilter && (
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span>Filter</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-auto flex-1 ${maxHeight ? '' : 'overflow-x-auto'}`} style={maxHeight ? { maxHeight } : {}}>
        <table className="min-w-full table-fixed">
          {columnWidths && Array.isArray(columnWidths) && (
            <colgroup>
              {columnWidths.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
          )}
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandardTable;




