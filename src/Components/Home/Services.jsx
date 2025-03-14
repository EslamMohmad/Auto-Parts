import { Swiper, SwiperSlide } from "swiper/react";

import service1 from "../../Assets/Home/Services/service (1).png";
import service2 from "../../Assets/Home/Services/service (2).png";
import service3 from "../../Assets/Home/Services/service (3).png";
import service4 from "../../Assets/Home/Services/service (4).png";
import service5 from "../../Assets/Home/Services/service (5).png";
import { Autoplay } from "swiper/modules";

const Services = () => {
  const services = [
    { img: service1, heading: "replace battery" },
    { img: service2, heading: "maintenance services" },
    { img: service3, heading: "insulation film stickers" },
    { img: service4, heading: " detailling service" },
    { img: service5, heading: "washing & clean" },
  ];

  return (
    <section>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        autoplay={{ pauseOnMouseEnter: true }}
        speed={1300}
        modules={[Autoplay]}
        className="!py-8 !pt-0 !px-5 !-mx-5"
        style={{ zIndex: 0 }}
        breakpoints={{
          1400: { slidesPerView: 5 },
          1200: { slidesPerView: 4 },
          1000: { slidesPerView: 3 },
          750: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {services.map(({ heading, img }) => (
          <SwiperSlide key={img}>
            <div className="flex flex-col gap-14 rounded-2xl items-center shadow-lightBox p-10 px-8 border-gray-300 border group">
              <h1 className="font-bold">{heading}</h1>
              <img
                src={img}
                className="w-[150px] h-[100px] object-cover group-hover:animate-vibration group-active:animate-vibration"
              />
              <p className="text-black/50 text-[13px] font-extralight">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
                quod, ipsum, tenetur a quos nulla quisquam, iure earum tempore
                quam cumque maiores debitis dignissimos aspernatur provident
                accusantium laudantium minima at.
              </p>
              <button className="bg-gray-300 py-3 px-7 rounded-3xl text-[11px] uppercase outline-none cursor-pointer hover:bg-red-500 active:bg-red-500 hover:text-white active:text-white transition-colors">
                learn more
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Services;
