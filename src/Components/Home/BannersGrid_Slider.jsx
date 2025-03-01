import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import slide_1 from "../../Assets/BannersGrid/slide (1).jpg";
import slide_2 from "../../Assets/BannersGrid/slide (2).jpg";
import slide_3 from "../../Assets/BannersGrid/slide (3).jpg";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useState } from "react";

const BannersGrid_Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { img: slide_1, text: "car wheels sport edition" },
    { img: slide_2, text: "brakes system for off road" },
    { img: slide_3, text: "car headlight 35w/55w" },
  ];

  const styleCondition = (trueVal, falseVal, index) => {
    return currentIndex === index ? trueVal : falseVal;
  };

  return (
    <div className="col-span-1 sm:col-span-2 row-span-2 overflow-hidden">
      <Swiper
        slidesPerView={1}
        effect="fade"
        pagination={true}
        autoplay={true}
        speed={300}
        modules={[EffectFade, Pagination, Autoplay]}
        fadeEffect={{ crossFade: true }}
        className="[&>.swiper-pagination>.swiper-pagination-bullet]:!bg-gray-300 h-full"
        style={{ zIndex: "0" }}
        onActiveIndexChange={(e) => setCurrentIndex(e.activeIndex)}
      >
        {slides.map(({ img, text }, index) => (
          <SwiperSlide key={img} className="h-full">
            <div className="relative h-full object-cover">
              <img
                src={img}
                className="h-full w-full rounded-2xl object-cover"
              />
              <div className="flex flex-col gap-3 uppercase absolute top-0 left-0 w-full h-full justify-center items-start pl-10">
                <h6
                  className={`relative text-sm text-red-700 transition-all duration-500 delay-1000 ${styleCondition(
                    "left-0",
                    "-left-full",
                    index
                  )}`}
                >
                  best sellers
                </h6>
                <h1
                  className={`relative text-white text-xl md:text-3xl w-[60%] md:w-[45%] leading-11 duration-700 delay-500 ${styleCondition(
                    "right-0 opacity-100",
                    "-right-10 opacity-0",
                    index
                  )} transition-all duration-500`}
                >
                  {text}
                </h1>
                <button
                  className={`bg-white py-3 px-7 rounded-2xl text-[11px] uppercase outline-none relative transition-[bottom_0.7s,_background-color_0.1s,_color_0.1s] duration-700 cursor-pointer hover:bg-red-500 hover:text-white ${styleCondition(
                    "bottom-0",
                    "-bottom-full transition-none",
                    index
                  )}`}
                >
                  shop now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannersGrid_Slider;
