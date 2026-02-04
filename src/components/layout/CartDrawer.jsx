import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export default function CartDrawer({ onCheckout }) {
  const {
    isCartOpen,
    toggleCart,
    cart,
    updateQuantity,
    removeFromCart
  } = useCartStore();

  const total = useCartStore((state) => state.getTotal());

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[200] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <ShoppingBag className="text-orange-600" size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  Seu Carrinho
                </h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4">
                  <ShoppingBag size={80} strokeWidth={1} className="opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-sm text-gray-400">
                    O carrinho está vazio
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 hover:bg-gray-50 rounded-xl p-2 transition-colors">
                    {/* Imagem */}
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-grow py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-black text-gray-800 uppercase text-sm">
                          {item.nome}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-sm font-black text-orange-600 mb-4">
                        R$ {item.preco?.toFixed(2)}
                      </p>

                      {/* Quantidade */}
                      <div className="flex items-center gap-2 bg-gray-100 w-fit rounded-xl px-2 py-1 border">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition"
                        >
                          -
                        </button>

                        <span className="text-xs font-black text-gray-800 min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-200 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-gray-400 font-black uppercase text-xs tracking-[0.2em]">
                  Total Estimado
                </span>
                <span className="text-4xl font-black bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                disabled={cart.length === 0}
                className="w-full bg-gray-900 hover:bg-orange-600 disabled:bg-gray-200 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all active:scale-95"
              >
                Finalizar Compra
              </button>

              <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">
                Frete e descontos calculados no checkout
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
