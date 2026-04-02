import React from 'react';
import { Trophy } from 'lucide-react';

const WinnerBadge = ({ isAlcoholMode }) => (
  <div className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 z-10 animate-bounce">
    <Trophy size={12} /> {isAlcoholMode ? 'Mais Alcoólico' : 'Mais Barato'}
  </div>
);

export default WinnerBadge;
