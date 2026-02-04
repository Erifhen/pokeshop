import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductCarousel({ products = [] }) {
  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <div className="relative px-4 sm:px-8 md:px-12">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <div className="transition-transform duration-300 hover:scale-105">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}

        {/* Botões customizados */}
        <div className="swiper-button-prev !text-orange-500 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-gradient-to-r hover:!from-orange-500 hover:!to-yellow-400 hover:!text-white transition"></div>
        <div className="swiper-button-next !text-orange-500 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-gradient-to-r hover:!from-orange-500 hover:!to-yellow-400 hover:!text-white transition"></div>
      </Swiper>
    </div>
  );
}
