import React from 'react';

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 pb-3 px-1 border-b-2 text-sm font-bold whitespace-nowrap transition-colors ${
      active ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

export default TabButton;
