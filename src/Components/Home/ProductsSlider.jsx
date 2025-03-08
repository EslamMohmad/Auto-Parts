import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../ReuseableComponents/Product";
import { Autoplay } from "swiper/modules";
import { useState } from "react";

const ProductsSlider = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Swiper
      spaceBetween="20"
      autoplay={{ disableOnInteraction: true, pauseOnMouseEnter: true }}
      speed={products.speed}
      modules={[Autoplay]}
      breakpoints={{
        1200: { slidesPerView: 3 },
        1024: { slidesPerView: 2 },
        880: { slidesPerView: 3 },
        445: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
      }}
      style={{ zIndex: 0 }}
      onActiveIndexChange={(e) => setCurrentSlide(e.activeIndex)}
      className="w-[calc(100%_+_2.5rem)] lg:w-[calc(100%_-_45%)] !p-5 !-m-5"
    >
      {Array.from({ length: products.slides }).map((_, index) => (
        <SwiperSlide key={index}>
          <Product index={index} currentSlide={currentSlide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsSlider;
