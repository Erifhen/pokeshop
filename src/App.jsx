import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import Footer from './components/layout/Footer';
import ProductSection from './components/products/ProductSection';
import CartDrawer from './components/layout/CartDrawer';
import ProductModal from './components/products/ProductModal';
import Checkout from './components/checkout/Checkout';

// Store e Dados
import productsData from './data/products.json';
import { useCartStore } from './store/useCartStore';

function App() {
  // Controle de qual "página" o usuário está vendo
  const [view, setView] = useState('shop'); // 'shop' ou 'checkout'
  const toggleCart = useCartStore((state) => state.toggleCart);

  // Função para transição suave para o checkout
  const handleGoToCheckout = () => {
    toggleCart(); // Fecha a lateral do carrinho
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* --- Componentes Fixos e Overlays --- */}
      <Navbar setView={setView} />
      <CartDrawer onCheckout={handleGoToCheckout} />
      <ProductModal />

      {/* --- Conteúdo Dinâmico --- */}
      <main className="flex-grow">
        {view === 'shop' ? (
          <>
            {/* Banner Principal */}
            <Hero />

            {/* Listagem de Produtos */}
            <div className="space-y-4 pb-20">
              <section id="cartas">
                <ProductSection
                  title="Cartas Avulsas"
                  category="Cartas Avulsas"
                  allProducts={productsData.cartasAvulsas}
                />
              </section>

              <section id="baralhos">
                <ProductSection
                  title="Baralhos"
                  category="Baralhos"
                  allProducts={productsData.baralhos}
                />
              </section>

              <section id="boosters">
                <ProductSection
                  title="Boosters"
                  category="Boosters"
                  allProducts={productsData.boosters}
                />
              </section>

              <section id="latas">
                <ProductSection
                  title="latas"
                  category="latas"
                  allProducts={productsData.latas}
                />
              </section>

              <section id="acessorios">
                <ProductSection
                  title="Acessórios"
                  category="Acessórios"
                  allProducts={productsData.acessorios}
                />
              </section>
            </div>

          </>
        ) : (
          /* Tela de Checkout */
          <Checkout onBack={() => setView('shop')} />
        )}
      </main>

      {/* --- Rodapé --- */}
      <Footer />
    </div>
  );
}

export default App;