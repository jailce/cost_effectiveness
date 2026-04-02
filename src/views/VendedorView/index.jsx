import React, { useState, useMemo } from 'react';
import { Store, Truck } from 'lucide-react';
import { calculateMetric, formatCurrency } from '../../utils';
import WinnerBadge from '../../WinnerBadge';
import InputField from '../../InputField';

const VendedorView = ({ isAlcoholMode }) => {
  const [items, setItems] = useState([
    { id: Date.now(), supplier: '', price: '', packs: 1, unitsPerPack: '', vol: '', abv: '' }
  ]);

  const evaluatedItems = useMemo(() => {
    return items.map(item => {
      // Calcula o total de unidades (ex: 5 fardos * 12 latas = 60 unidades)
      const totalUnits = parseFloat(item.packs || 1) * parseFloat(item.unitsPerPack || 1);
      
      const metricItem = {
        price: item.price,
        vol: item.vol,
        qty: totalUnits,
        abv: item.abv
      };
      
      const metric = calculateMetric(metricItem, isAlcoholMode);
      const price = parseFloat(item.price);
      
      // O dado mais importante para o vendedor: custo de cada lata/garrafa
      const unitCost = (!isNaN(price) && totalUnits > 0) ? price / totalUnits : null;

      return { ...item, metric, unitCost, totalUnits };
    });
  }, [items, isAlcoholMode]);

  const validItems = evaluatedItems.filter(i => i.metric !== null);
  const minMetric = validItems.length > 1 ? Math.min(...validItems.map(i => i.metric)) : null;

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Revelação Progressiva: se preencheu tudo no último fornecedor, abre um novo card
    const isLast = index === newItems.length - 1;
    const isFilled = newItems[index].price && newItems[index].unitsPerPack && newItems[index].vol && (!isAlcoholMode || newItems[index].abv);

    if (isLast && isFilled) {
      newItems.push({ id: Date.now(), supplier: '', price: '', packs: 1, unitsPerPack: '', vol: '', abv: '' });
    }
    setItems(newItems);
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-20">
      <div className="bg-orange-50 border border-orange-200 text-orange-800 text-xs p-3 rounded-xl mb-6 flex gap-2 items-start">
        <Store size={16} className="mt-0.5 flex-shrink-0" />
        <p><strong>Modo Atacado:</strong> Compare lotes e fardos. O app calcula o custo exato de cada unidade para você projetar sua margem de lucro na revenda.</p>
      </div>

      {evaluatedItems.map((item, index) => {
        const isWinner = minMetric !== null && item.metric === minMetric;
        const isLastAndEmpty = index === items.length - 1 && !item.price && !item.unitsPerPack;

        return (
          <div key={item.id} className={`relative p-4 rounded-xl border-2 transition-all ${isWinner ? 'border-green-500 bg-green-50 shadow-md scale-[1.02]' : 'border-amber-50 bg-white shadow-sm'} ${isLastAndEmpty ? 'opacity-60' : ''}`}>
            {isWinner && <WinnerBadge isAlcoholMode={isAlcoholMode} />}
            
            <div className="flex items-center gap-2 mb-3">
              <Truck size={16} className={isWinner ? 'text-green-600' : 'text-gray-400'} />
              <div className="flex-1">
                <InputField type="text" label="Fornecedor / Lote (Opcional)" value={item.supplier} onChange={(e) => handleChange(index, 'supplier', e.target.value)} placeholder={`Opção ${index + 1}`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <InputField label="Preço Lote (R$)" value={item.price} onChange={(e) => handleChange(index, 'price', e.target.value)} placeholder="0,00" />
              <InputField label="Unid. por Fardo" value={item.unitsPerPack} onChange={(e) => handleChange(index, 'unitsPerPack', e.target.value)} placeholder="ex: 12" />
            </div>

            <div className="flex gap-3 mb-3">
              <div className="w-1/3">
                <InputField label="Qtd Fardos" value={item.packs} onChange={(e) => handleChange(index, 'packs', e.target.value)} placeholder="1" />
              </div>
              <div className="flex-1">
                <InputField label="Vol/Unidade (ml)" value={item.vol} onChange={(e) => handleChange(index, 'vol', e.target.value)} placeholder="ex: 350" />
              </div>
              {isAlcoholMode && (
                <div className="flex-1">
                  <InputField label="ABV %" value={item.abv} onChange={(e) => handleChange(index, 'abv', e.target.value)} placeholder="5%" />
                </div>
              )}
            </div>

            {item.metric && (
              <div className={`mt-4 pt-3 border-t flex justify-between items-center ${isWinner ? 'border-green-200' : 'border-gray-100'}`}>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-500">Custo da Unidade</span>
                  <span className={`text-lg font-black ${isWinner ? 'text-green-700' : 'text-gray-700'}`}>
                    {formatCurrency(item.unitCost)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-gray-500">Custo por Litro {isAlcoholMode ? 'de Álcool' : ''}</span>
                  <span className={`text-sm font-bold ${isWinner ? 'text-green-600' : 'text-gray-600'}`}>
                    {formatCurrency(item.metric)}/L
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VendedorView;
