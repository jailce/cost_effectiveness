import React, { useState, useMemo } from 'react';
import { Swords } from 'lucide-react';
import { calculateMetric, formatCurrency } from '../../utils';
import WinnerBadge from '../../WinnerBadge';
import InputField from '../../InputField';

const DueloView = ({ isAlcoholMode }) => {
  const [items, setItems] = useState([
    { id: 'A', name: 'Opção A', vol: '', qty: 1, price: '', abv: '' },
    { id: 'B', name: 'Opção B', vol: '', qty: 1, price: '', abv: '' }
  ]);

  const evaluatedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      metric: calculateMetric(item, isAlcoholMode)
    }));
  }, [items, isAlcoholMode]);

  const validItems = evaluatedItems.filter(i => i.metric !== null);
  const minMetric = validItems.length === 2 ? Math.min(...validItems.map(i => i.metric)) : null;

  const handleChange = (id, field, value) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="flex flex-col gap-6 pt-4 animate-fadeIn">
      {evaluatedItems.map((item, index) => {
        const isWinner = minMetric !== null && item.metric === minMetric;
        const isLoser = minMetric !== null && item.metric !== minMetric;

        return (
          <div key={item.id} className="relative">
            {isWinner && <WinnerBadge isAlcoholMode={isAlcoholMode} />}
            <div className={`p-5 rounded-2xl border-2 transition-all shadow-md ${isWinner ? 'border-green-500 bg-green-50 scale-105 z-10' : isLoser ? 'border-red-200 bg-red-50 opacity-80' : 'border-amber-50 bg-white'}`}>
              
              <h3 className={`text-lg font-black mb-4 flex items-center gap-2 ${isWinner ? 'text-green-700' : 'text-gray-700'}`}>
                {item.name}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                 <InputField label="Volume (ml) da Unidade" value={item.vol} onChange={(e) => handleChange(item.id, 'vol', e.target.value)} placeholder="ex: 600" />
                 <InputField label="Preço Total (R$)" value={item.price} onChange={(e) => handleChange(item.id, 'price', e.target.value)} placeholder="0,00" />
                 
                 <div className="col-span-2 flex gap-4">
                    <div className="w-1/3">
                      <InputField label="Qtd (Fardo)" value={item.qty} onChange={(e) => handleChange(item.id, 'qty', e.target.value)} placeholder="1" />
                    </div>
                    {isAlcoholMode && (
                      <div className="flex-1">
                        <InputField label="Teor Alcoólico (%)" value={item.abv} onChange={(e) => handleChange(item.id, 'abv', e.target.value)} placeholder="ex: 5" />
                      </div>
                    )}
                 </div>
              </div>

              {item.metric && (
                <div className={`p-3 rounded-lg flex justify-between items-center ${isWinner ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <span className="text-xs uppercase font-bold text-gray-500">Custo por Litro</span>
                  <span className={`text-xl font-black ${isWinner ? 'text-green-700' : 'text-gray-700'}`}>
                    {formatCurrency(item.metric)}
                  </span>
                </div>
              )}
            </div>

            {/* Marcador de VS no meio */}
            {index === 0 && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-gray-800 text-white p-2 rounded-full border-4 border-gray-50">
                <Swords size={20} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DueloView;
