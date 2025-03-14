import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css/grid";

import brand1 from "../../Assets/Home/Brands/brand-1.png";
import brand2 from "../../Assets/Home/Brands/brand-2.png";
import brand3 from "../../Assets/Home/Brands/brand-3.png";
import brand4 from "../../Assets/Home/Brands/brand-4.png";
import brand5 from "../../Assets/Home/Brands/brand-5.png";
import brand6 from "../../Assets/Home/Brands/brand-6.png";
import brand7 from "../../Assets/Home/Brands/brand-7.png";
import brand8 from "../../Assets/Home/Brands/brand-8.png";
import brand9 from "../../Assets/Home/Brands/brand-9.png";
import brand10 from "../../Assets/Home/Brands/brand-10.png";
import brand11 from "../../Assets/Home/Brands/brand-11.png";
import brand12 from "../../Assets/Home/Brands/brand-12.png";

import banner1 from "../../Assets/Home/Brands/banner (2).jpg";
import banner2 from "../../Assets/Home/Brands/banner (1).jpg";
import Shop_Now_Button from "../../ReuseableComponents/Shop_Now_Button";

const Brands = () => {
  const brands = [
    brand1,
    brand2,
    brand3,
    brand4,
    brand5,
    brand6,
    brand7,
    brand8,
    brand9,
    brand10,
    brand11,
    brand12,
  ];

  const banners = [
    { img: banner1, heading: "michelin tire", text: "premium performace" },
    {
      img: banner2,
      heading: "better brakes",
      text: "best sellers brakes system",
    },
  ];

  return (
    <section>
      <Swiper
        spaceBetween="20"
        speed={1500}
        autoplay={true}
        breakpoints={{
          1200: { slidesPerView: 6, grid: { rows: 2, fill: "row" } },
          1024: { slidesPerView: 4, grid: { rows: 2, fill: "row" } },
          880: { slidesPerView: 3, grid: { rows: 2, fill: "row" } },
          0: { slidesPerView: 2, grid: { rows: 2, fill: "row" } },
        }}
        modules={[Grid, Autoplay]}
        className="!py-6 !px-5 !-mx-7"
        style={{ zIndex: 0 }}
      >
        {brands.map((brand) => (
          <SwiperSlide
            key={brand}
            className="border border-gray-300 p-6 !h-[140px] group shadow-lightBox rounded-2xl"
          >
            <img
              src={brand}
              className="w-1/2 h-1/2 mx-auto translate-y-1/2 group-hover:animate-vibration group-active:animate-vibration object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col lg:flex-row gap-5 py-10">
        {banners.map(({ img, heading, text }) => (
          <div key={img} className="overflow-hidden rounded-2xl relative group">
            <img
              src={img}
              className="group-hover:scale-105 group-active:scale-105 transition-transform"
            />
            <div className="bg-[#ffffff26] -rotate-45 h-[30%] w-[150%] absolute bottom-[110%] right-[25%] transition-none duration-700 group-hover:bottom-0 group-hover:-right-full  group-hover:transition-all group-active:bottom-0 group-active:-right-full  group-active:transition-all"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 pl-10">
              <h1 className="uppercase sm:text-3xl font-bold text-amber-300">
                {heading}
              </h1>
              <p className="text-white text-[10px] sm:text-base capitalize my-3 sm:my-5 font-extralight">
                {text}
              </p>
              <Shop_Now_Button />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
