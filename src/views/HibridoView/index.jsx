import React, { useState, useMemo } from 'react';
import { Beer, BottleWine, Percent, Calculator, ListPlus } from 'lucide-react';
import { calculateMetric, formatCurrency } from '../../utils';
import WinnerBadge from '../../WinnerBadge';
import InputField from '../../InputField';

const HibridoView = ({ isAlcoholMode, globalItems, setGlobalItems }) => {
  // Presets fixos
  const [presets, setPresets] = useState([
    { id: 'p1', label: 'Lata', vol: 350, qty: 1, price: '', abv: '', icon: Beer },
    { id: 'p2', label: 'Latão', vol: 473, qty: 1, price: '', abv: '', icon: Beer },
    { id: 'p3', label: 'Garrafa', vol: 600, qty: 1, price: '', abv: '', icon: BottleWine },
    { id: 'p4', label: 'Litrão', vol: 1000, qty: 1, price: '', abv: '', icon: BottleWine },
  ]);

  // Lista dinâmica livre (Progressive Disclosure)
  const [freeItems, setFreeItems] = useState([
    { id: Date.now(), vol: '', qty: 1, price: '', abv: '' }
  ]);

  // Combina todos os itens para achar o vencedor
  const allItems = useMemo(() => {
    return [...presets, ...freeItems].map(item => ({
      ...item,
      metric: calculateMetric(item, isAlcoholMode)
    }));
  }, [presets, freeItems, isAlcoholMode]);

  const validItems = allItems.filter(i => i.metric !== null);
  const minMetric = validItems.length > 1 ? Math.min(...validItems.map(i => i.metric)) : null;

  const handlePresetChange = (id, field, value) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleFreeItemChange = (index, field, value) => {
    const newItems = [...freeItems];
    newItems[index] = { ...newItems[index], [field]: value };

    // Revelação Progressiva: se preencheu o último, adiciona um novo
    const isLast = index === newItems.length - 1;
    const isFilled = newItems[index].price && newItems[index].vol && (!isAlcoholMode || newItems[index].abv);
    
    if (isLast && isFilled) {
      newItems.push({ id: Date.now(), vol: '', qty: 1, price: '', abv: '' });
    }

    setFreeItems(newItems);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      {/* SEÇÃO GRID */}
      <section>
        <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Calculator size={16} /> Tamanhos Comuns
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {presets.map((preset) => {
            const myMetric = allItems.find(i => i.id === preset.id)?.metric;
            const isWinner = minMetric !== null && myMetric === minMetric;

            return (
              <div key={preset.id} className={`relative p-3 rounded-xl border-2 transition-all ${isWinner ? 'border-green-500 bg-green-50' : 'border-amber-50 bg-white shadow-sm'}`}>
                {isWinner && <WinnerBadge isAlcoholMode={isAlcoholMode} />}
                <div className="flex items-center gap-2 mb-2 text-gray-700">
                  <preset.icon size={16} className={isWinner ? 'text-green-600' : 'text-gray-400'} />
                  <span className="font-bold text-sm">{preset.label} <span className="text-xs font-normal text-gray-500">({preset.vol}ml)</span></span>
                </div>
                <div className="flex gap-2">
                  <InputField label="R$" value={preset.price} onChange={(e) => handlePresetChange(preset.id, 'price', e.target.value)} placeholder="0,00" />
                  {isAlcoholMode && (
                    <InputField label="Álcool %" value={preset.abv} onChange={(e) => handlePresetChange(preset.id, 'abv', e.target.value)} placeholder="0%" icon={Percent} />
                  )}
                </div>
                {myMetric && (
                  <div className={`mt-2 text-xs font-semibold text-right ${isWinner ? 'text-green-700' : 'text-gray-400'}`}>
                    {formatCurrency(myMetric)}/L {isAlcoholMode ? 'álcool' : ''}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SEÇÃO LISTA LIVRE (PROGRESSIVA) */}
      <section>
        <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <ListPlus size={16} /> Personalizado
        </h2>
        <div className="space-y-3">
          {freeItems.map((item, index) => {
             const myMetric = allItems.find(i => i.id === item.id)?.metric;
             const isWinner = minMetric !== null && myMetric === minMetric;
             const isLastAndEmpty = index === freeItems.length - 1 && !item.price && !item.vol;

             return (
              <div key={item.id} className={`relative p-3 rounded-xl border-2 transition-all ${isWinner ? 'border-green-500 bg-green-50' : 'border-amber-50 bg-white shadow-sm'} ${isLastAndEmpty ? 'opacity-50' : ''}`}>
                {isWinner && <WinnerBadge isAlcoholMode={isAlcoholMode} />}
                
                <div className="flex flex-wrap gap-2 mb-2">
                   <div className="w-16">
                     <InputField label="Qtd" value={item.qty} onChange={(e) => handleFreeItemChange(index, 'qty', e.target.value)} placeholder="1" />
                   </div>
                   <div className="flex-1">
                     <InputField label="Vol (ml)" value={item.vol} onChange={(e) => handleFreeItemChange(index, 'vol', e.target.value)} placeholder="ex: 350" />
                   </div>
                   <div className="flex-1">
                     <InputField label="Preço (R$)" value={item.price} onChange={(e) => handleFreeItemChange(index, 'price', e.target.value)} placeholder="0,00" />
                   </div>
                   {isAlcoholMode && (
                     <div className="flex-1">
                       <InputField label="ABV %" value={item.abv} onChange={(e) => handleFreeItemChange(index, 'abv', e.target.value)} placeholder="5%" />
                     </div>
                   )}
                </div>

                {myMetric && (
                  <div className={`text-sm font-bold text-right ${isWinner ? 'text-green-700' : 'text-gray-400'}`}>
                    {formatCurrency(myMetric)} / Litro {isAlcoholMode ? 'de puro álcool' : ''}
                  </div>
                )}
              </div>
             );
          })}
        </div>
      </section>
    </div>
  );
};

export default HibridoView;
