import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import productsData from '../../data/products.json';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const openModal = useCartStore((state) => state.openModal);

  useEffect(() => {
    if (query.length > 1) {
      // "Achata" o objeto de categorias em uma lista única de produtos
      const allProducts = Object.values(productsData).flat();
      
      const filtered = allProducts.filter(item => 
        item.nome.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limita a 5 resultados para o visual ficar limpo
      
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (product) => {
    openModal(product);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar pokémon, baralhos..."
          className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
      </div>

      {/* Dropdown de Autocomplete */}
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[200] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">
            Resultados Sugeridos
          </div>
          {results.map(product => (
            <div 
              key={product.id} 
              onClick={() => handleSelect(product)}
              className="p-3 hover:bg-orange-50 cursor-pointer flex items-center gap-4 transition-colors border-b border-gray-50 last:border-none group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 group-hover:bg-white transition-colors">
                <img src={product.imagem} alt={product.nome} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {product.nome}
                </p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                  R$ {product.preco.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}