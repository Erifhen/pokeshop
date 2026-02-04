import ProductCarousel from './ProductCarousel';

export default function ProductSection({ title, allProducts = [] }) {
  if (!Array.isArray(allProducts) || allProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto border-b border-gray-100 last:border-none px-4">
      <div className="flex items-center justify-between mb-10">
        {/* Título com gradiente */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
            {title}
          </h2>
          {/* Linha animada */}
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-yellow-400 mt-2 rounded-full animate-pulse" />
        </div>

        {/* Botão “Ver todos” */}
        <button
          type="button"
          className="text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Ver todos
        </button>
      </div>

      {/* Carrossel de produtos */}
      <ProductCarousel products={allProducts} />
    </section>
  );
}

