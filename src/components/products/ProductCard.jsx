import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';

export default function ProductCard({ product }) {
  if (!product) return null;

  const { id, nome, preco, descricao, imagem, tier } = product;

  const [isHovered, setIsHovered] = useState(false);

  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    openModal
  } = useCartStore();

  const cartItem = cart.find(item => item.id === id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => addToCart(product);
  const handleIncrement = () => updateQuantity(id, quantity + 1);
  const handleDecrement = () =>
    quantity === 1 ? removeFromCart(id) : updateQuantity(id, quantity - 1);

  // tiers que terão efeito foil
  const foilTiers = ['A', 'S'];

  return (
    <motion.div
      className="relative group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border h-[420px] flex flex-col overflow-hidden border-gray-100 cursor-pointer"
      onClick={() => openModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Badge de Tier */}
      {tier && (
        <div className="absolute top-3 left-3 z-20 font-black text-sm">
          <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
            {tier}
          </span>
        </div>
      )}

      {/* Imagem com shimmer nos tiers A e S */}
      <div
        className={`relative h-56 w-full mb-4 flex items-center justify-center overflow-hidden ${
          foilTiers.includes(tier) ? 'shimmer' : ''
        }`}
      >
        <motion.img
          src={imagem || '/placeholder.png'}
          alt={nome}
          animate={{ scale: isHovered ? 1.25 : 1 }}
          transition={{ duration: 0.4 }}
          className="max-h-full object-contain drop-shadow-md relative z-10"
        />
      </div>

      {/* Informações */}
      <div className="flex-grow z-10">
        <motion.h3
          className="font-bold text-gray-800 text-lg leading-tight mb-1 truncate"
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {nome}
        </motion.h3>

        <AnimatePresence>
          {!isHovered && descricao && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-xs mb-2 line-clamp-2"
            >
              {descricao}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.p
          className="text-2xl font-black text-gray-900"
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          R$ {preco.toFixed(2)}
        </motion.p>
      </div>

      {/* Ações */}
      <div className="mt-4 h-12 z-10">
        {quantity === 0 ? (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full h-full bg-gray-950 hover:bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart size={18} />
            Adicionar
          </motion.button>
        ) : (
          <div
            className="flex items-center justify-between h-full bg-gray-100 rounded-xl p-1 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDecrement}
              className="w-10 h-full flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-600"
            >
              <Minus size={16} />
            </button>

            <span className="font-bold text-gray-900">{quantity}</span>

            <button
              onClick={handleIncrement}
              className="w-10 h-full flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-600"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
