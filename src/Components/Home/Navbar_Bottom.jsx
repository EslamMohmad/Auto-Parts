import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import slide_1 from "../../Assets/Navbar/categorie (1).svg";
import slide_2 from "../../Assets/Navbar/categorie (2).svg";
import slide_3 from "../../Assets/Navbar/categorie (3).svg";
import slide_4 from "../../Assets/Navbar/categorie (4).svg";
import slide_5 from "../../Assets/Navbar/categorie (5).svg";
import slide_6 from "../../Assets/Navbar/categorie (6).svg";

const Navbar_Bottom = () => {
  const slides = [
    { img: slide_1, text: "automotive rims" },
    { img: slide_2, text: "automotive rims" },
    { img: slide_3, text: "brakes system" },
    { img: slide_4, text: "tires & wheels" },
    { img: slide_5, text: "headlight" },
    { img: slide_6, text: "suspension " },
  ];

  return (
    <section>
      <Swiper
        spaceBetween={20}
        className="!p-3 !-mx-3"
        style={{ zIndex: 0 }}
        speed={500}
        modules={[Autoplay]}
        autoplay={true}
        breakpoints={{
          1350: { slidesPerView: 6 },
          1024: { slidesPerView: 4 },
          767: { slidesPerView: 3 },
          427: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {slides.map(({ img, text }) => (
          <SwiperSlide
            key={img}
            className="bg-gray-100 !flex gap-3 py-6 px-4 items-center rounded-xl cursor-pointer hover:bg-white active:bg-white !transition-all border border-white hover:border-amber-400 active:border-amber-400 group hover:shadow-[7px_7px_5px] active:shadow-[7px_7px_5px] shadow-gray-300 group"
          >
            <img src={img} className="w-[50px]" />
            <h1 className="text-sm group-hover:text-red-500 transition-colors">
              {text}
            </h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Navbar_Bottom;
