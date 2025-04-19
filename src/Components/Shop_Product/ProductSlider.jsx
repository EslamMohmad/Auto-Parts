import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingProduct from "../../ReuseableComponents/LoadingProduct";
import { Autoplay, FreeMode, Grid, Navigation, Thumbs } from "swiper/modules";

const ProductSlider = ({ details, loadingState }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="flex flex-col gap-5 h-[69vh] md:h-auto lg:h-[70vh] static md:sticky md:top-[100px]">
      <Swiper
        onSlideChange={(e) => setActiveSlide(e.activeIndex)}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, FreeMode, Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        speed={1500}
        className="border rounded-xl !w-full border-black/15 !h-3/4 group"
        style={{ zIndex: 0 }}
      >
        {details?.imgs?.map((img) => (
          <SwiperSlide key={img} className="relative overflow-hidden">
            <LoadingProduct state={loadingState} />
            <img src={img} className={`h-full bg-cover mx-auto`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Navigation, Thumbs, Grid]}
        freeMode={true}
        watchSlidesProgress={true}
        breakpoints={{
          450: { slidesPerView: 4 || 4 },
          0: { slidesPerView: 3 || 4 },
        }}
        spaceBetween={"24"}
        grid={{ rows: 1, fill: "row" }}
        className="!w-full min-h-[100px]"
      >
        {details?.imgs?.map((img, index) => (
          <SwiperSlide
            key={img}
            className={`border ${
              activeSlide === index ? "border-red-600" : "border-black/15"
            } rounded-xl overflow-hidden cursor-pointer hover:border-red-600 active:border-red-600 transition-colors`}
          >
            <LoadingProduct state={loadingState} />
            <img src={img} className="h-full mx-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
