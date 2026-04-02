import React from 'react';

const InputField = ({ label, value, onChange, placeholder, icon: Icon, type = "number" }) => (
  <div className="flex flex-col flex-1 min-w-[70px]">
    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">{label}</label>
    <div className="relative">
      {Icon && <Icon size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-white border ${value ? 'border-gray-300' : 'border-gray-200'} rounded-lg p-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${Icon ? 'pl-7' : 'pl-2'}`}
      />
    </div>
  </div>
);

export default InputField;
