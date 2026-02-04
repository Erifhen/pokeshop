// Dentro do seu CartWidget.jsx
import { useCartStore } from "../../store/useCartStore";
import { ShoppingCart } from "lucide-react";

export default function CartWidget() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  // AQUI É ONDE VOCÊ MUDA:
  // Chamamos getItemCount() como uma função dentro do seletor
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <button onClick={toggleCart} className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
          {itemCount}
        </span>
      )}
    </button>
  );
}