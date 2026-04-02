import React, { useState } from 'react';
import { Wine, Info, Calculator, Swords, Store, ShoppingCart } from 'lucide-react';
import TabButton from './TabButton';
import HibridoView from './views/HibridoView';
import DueloView from './views/DueloView';
import VendedorView from './views/VendedorView';

export default function App() {
  const [isAlcoholMode, setIsAlcoholMode] = useState(false);
  const [mainTab, setMainTab] = useState('consumidor'); // 'consumidor' ou 'vendedor'
  const [consumerTab, setConsumerTab] = useState('hibrido'); // 'hibrido' ou 'duelo'

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans sm:pb-10">
      
      {/* HEADER / TOPBAR */}
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-md mx-auto">
          {/* Título e Toggle de Álcool */}
          <div className="p-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-tight">Bebida Justa</h1>
              <p className="text-xs text-gray-500 font-medium">Calculadora de Custo-Benefício</p>
            </div>
            
            <button 
              onClick={() => setIsAlcoholMode(!isAlcoholMode)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-colors border ${isAlcoholMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
            >
              <Wine size={14} />
              {isAlcoholMode ? 'Modo Álcool: ON' : 'Modo Álcool: OFF'}
            </button>
          </div>

          {/* Abas de Navegação (Views Principais) */}
          <div className="flex px-4 pb-0 no-scrollbar gap-6 border-t border-gray-100 pt-2">
            <TabButton active={mainTab === 'consumidor'} onClick={() => setMainTab('consumidor')} icon={ShoppingCart} label="Para Consumidor" />
            <TabButton active={mainTab === 'vendedor'} onClick={() => setMainTab('vendedor')} icon={Store} label="Para Atacado/Vendedor" />
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-md mx-auto p-4">
        {isAlcoholMode && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs p-3 rounded-xl mb-6 flex gap-2 items-start animate-fadeIn">
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <p><strong>Modo Alcoólico:</strong> O app calcula quem entrega mais álcool puro por real investido. Ideal para comparar cervejas artesanais e destilados.</p>
          </div>
        )}

        {/* SUBMENU DO CONSUMIDOR (Área Cinza) */}
        {mainTab === 'consumidor' && (
          <div className="flex bg-gray-200/60 p-1 rounded-xl mb-6 animate-fadeIn">
            <button
              onClick={() => setConsumerTab('hibrido')}
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-lg transition-all ${consumerTab === 'hibrido' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Calculator size={14} /> Híbrido
            </button>
            <button
              onClick={() => setConsumerTab('duelo')}
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-lg transition-all ${consumerTab === 'duelo' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Swords size={14} /> Duelo Rápido
            </button>
          </div>
        )}

        {/* Renderiza a View baseada nas abas selecionadas */}
        {mainTab === 'consumidor' && consumerTab === 'hibrido' && <HibridoView isAlcoholMode={isAlcoholMode} />}
        {mainTab === 'consumidor' && consumerTab === 'duelo' && <DueloView isAlcoholMode={isAlcoholMode} />}
        {mainTab === 'vendedor' && <VendedorView isAlcoholMode={isAlcoholMode} />}
        
      </main>

    </div>
  );
}
