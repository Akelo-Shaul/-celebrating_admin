import React from 'react';

const SettingsCard = ({ title, children }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const SettingField = ({ label, type = "input", value, options = [], placeholder }) => {
  const renderInput = () => {
    if (type === "dropdown") {
      return (
        <div className="relative">
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white">
            {options.map((option, index) => (
              <option key={index} value={option.value} selected={option.value === value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      );
    }
    
    if (type === "checkbox") {
      return (
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={value}
            className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-200"
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>
      );
    }
    
    return (
      <div className="relative">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div>
      {type === "checkbox" ? (
        renderInput()
      ) : (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          {renderInput()}
        </>
      )}
    </div>
  );
};

export { SettingsCard, SettingField };







