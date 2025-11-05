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

const SettingField = ({ label, type = "input", value, options = [], placeholder, onChange }) => {
  const renderInput = () => {
    if (type === "dropdown") {
      return (
        <div className="relative">
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
            value={value}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
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
            onChange={onChange}
            className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-200"
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>
      );
    }
    
    return (
      <input
        type={type === "number" ? "number" : "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
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










