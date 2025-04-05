import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../ReuseableComponents/Product";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../../Firebase/Firebase";

const ProductsSlider = ({ type }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides.length) {
      const myRef = child(ref(database), `Auto-Parts/${type}`);
      get(myRef).then((res) => setSlides(res.val()));
    }
  }, [slides.length]);

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
