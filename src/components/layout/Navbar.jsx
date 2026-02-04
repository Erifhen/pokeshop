import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import CartWidget from "./CartWidget";
import { useCartStore } from "../../store/useCartStore";

export default function Navbar({ setView }) {
  const user = useCartStore((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: "Cartas Avulsas", id: "cartas" },
    { label: "Baralhos", id: "baralhos" },
    { label: "Boosters", id: "boosters" },
    { label: "Latas", id: "latas" },
    { label: "Acessórios", id: "acessorios" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-[100] border-b border-gray-100">
      
      {/* --- Desktop Navbar --- */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer select-none mr-8"
            onClick={() => setView && setView('shop')} 
          >
            <span className="text-3xl font-black tracking-tight bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
              GOOD LUCK
            </span>
          </div>

          {/* Busca Central */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          {/* Ações Direita */}
          <div className="flex items-center gap-8 ml-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User size={20} />
              <span>Olá, <span className="font-semibold text-gray-900">{user.name}</span></span>
            </div>
            <CartWidget />
          </div>
        </div>

        {/* Menu Categorias */}
        <div className="bg-white border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center gap-8">
            {menuItems.map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- Mobile Navbar --- */}
      <div className="flex md:hidden px-4 h-16 items-center justify-between">
        <span 
          className="text-xl font-black tracking-tight bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)] cursor-pointer"
          onClick={() => setView && setView('shop')}
        >
          GOOD LUCK
        </span>

        <div className="flex items-center gap-4">
          <CartWidget />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 space-y-6 animate-in slide-in-from-top duration-300">
          <SearchBar />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={20} />
            <span>Olá, <span className="font-semibold text-gray-900">{user.name}</span></span>
          </div>
          <div className="flex flex-col gap-4">
            {menuItems.map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
