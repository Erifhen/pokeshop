import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Package, ShieldCheck, Trophy } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import productsData from '../../data/products.json';

/* ⭐ Componente de estrelas reutilizável */
function Stars({ value = 0, size = 14 }) {
  const fullStars = Math.floor(value);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < fullStars
              ? 'text-yellow-500 fill-yellow-500'
              : 'text-gray-300'
          }
        />
      ))}
    </div>
  );
}

export default function ProductModal() {
  const { selectedProduct, closeModal, addToCart, openModal } = useCartStore();

  if (!selectedProduct) return null;

  const allProducts = Object.values(productsData).flat();
  const recommendations = allProducts
    .filter(p => p.id !== selectedProduct.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Fechar */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-3 hover:bg-gray-100 rounded-full text-gray-400 hover:text-orange-600 z-50 transition-all shadow-md"
          >
            <X size={20} />
          </button>

          {/* Imagem */}
          <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center border-r border-gray-100 relative">
            <div className="absolute w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
            <motion.img
              src={selectedProduct.imagem}
              alt={selectedProduct.nome}
              className="max-h-[450px] object-contain drop-shadow-2xl z-10"
            />
          </div>

          {/* Conteúdo */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {selectedProduct.tier && (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-1 rounded-full shadow-sm">
                  <Trophy size={10} /> Tier {selectedProduct.tier}
                </span>
              )}

              {selectedProduct.avaliacaoMedia && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-50 px-4 py-1 rounded-full shadow-sm">
                  <Stars value={selectedProduct.avaliacaoMedia} />
                  <span className="text-xs font-black text-yellow-700">
                    {selectedProduct.avaliacaoMedia.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
              {selectedProduct.nome}
            </h2>

            {/* Descrição */}
            <p className="text-gray-500 mb-8 leading-relaxed">
              {selectedProduct.descricao}
            </p>

            {/* Preço */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl font-black bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                R$ {selectedProduct.preco.toFixed(2)}
              </span>
              <div>
                <span className="line-through text-gray-300 text-sm font-bold">
                  R$ {(selectedProduct.preco * 1.15).toFixed(2)}
                </span>
                <div className="bg-green-100 text-green-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Economize 15%
                </div>
              </div>
            </div>

            {/* Comprar */}
            <button
              onClick={() => {
                addToCart(selectedProduct);
                closeModal();
              }}
              className="w-full py-5 bg-gradient-to-r from-orange-600 to-yellow-500 text-white rounded-2xl font-black uppercase tracking-widest hover:shadow-xl hover:scale-[1.02] transition-all mb-10"
            >
              Adicionar ao Carrinho
            </button>

            {/* Selos */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-2 rounded-full">
                  <Package className="text-orange-600" size={18} />
                </div>
                <span className="text-[10px] font-black uppercase text-gray-400">
                  Envio em 24h
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-2 rounded-full">
                  <ShieldCheck className="text-orange-600" size={18} />
                </div>
                <span className="text-[10px] font-black uppercase text-gray-400">
                  Produto Original
                </span>
              </div>
            </div>

            {/* Avaliações */}
            {selectedProduct.avaliacoes?.length > 0 ? (
              <div className="border-t border-gray-100 pt-8 mb-12">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-6">
                  Avaliações
                </h4>

                <div className="space-y-6">
                  {selectedProduct.avaliacoes.map((a, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-sm text-gray-800">
                          {a.usuario}
                        </span>
                        <Stars value={a.nota} size={12} />
                      </div>
                      <p className="text-sm text-gray-500">
                        {a.comentario}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-100 pt-8 mb-12 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Este produto ainda não possui avaliações
                </p>
              </div>
            )}

            {/* Recomendações */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-6">
                Complete sua coleção
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {recommendations.map(item => (
                  <div
                    key={item.id}
                    onClick={() => openModal(item)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-gray-50 rounded-2xl p-3 aspect-square flex items-center justify-center mb-2 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-yellow-50 transition-all shadow-sm hover:shadow-md">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <p className="text-[9px] font-black uppercase text-center truncate text-gray-700 group-hover:text-orange-600 transition-colors">
                      {item.nome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
