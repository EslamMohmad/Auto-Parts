import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../ReuseableComponents/Product";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import useGetProducts from "../../Hooks/useGetProducts";

const ProductsSlider = ({ type }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useGetProducts(type);

  return (
    <div className="w-full lg:w-[calc(100%_-_50%)] lg:mx-6">
      <Swiper
        spaceBetween="20"
        autoplay={{ pauseOnMouseEnter: true }}
        speed={1500}
        modules={[Autoplay]}
        breakpoints={{
          1265: { slidesPerView: 3 },
          1024: { slidesPerView: 2 },
          880: { slidesPerView: 3 },
          445: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        style={{ zIndex: 0 }}
        onActiveIndexChange={(e) => setCurrentSlide(e.activeIndex)}
        className="!p-5 !-m-5"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Product currentSlide={currentSlide} details={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
