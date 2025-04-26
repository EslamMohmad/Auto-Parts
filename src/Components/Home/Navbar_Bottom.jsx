import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import slide_1 from "../../Assets/Home/Navbar/categorie (1).svg";
import slide_2 from "../../Assets/Home/Navbar/categorie (2).svg";
import slide_3 from "../../Assets/Home/Navbar/categorie (3).svg";
import slide_4 from "../../Assets/Home/Navbar/categorie (4).svg";
import slide_5 from "../../Assets/Home/Navbar/categorie (5).svg";
import slide_6 from "../../Assets/Home/Navbar/categorie (6).svg";
import { Link } from "react-router-dom";

const Navbar_Bottom = () => {
  const slides = [
    { img: slide_1, text: "automotive rims", link: "Automotive Rims" },
    { img: slide_2, text: "car audio systems", link: "Car Audio Systems" },
    { img: slide_3, text: "brakes systems", link: "Brakes Systems" },
    { img: slide_4, text: "tires & wheels", link: "Tires & Wheels" },
    { img: slide_5, text: "headlights", link: "Headlights" },
    { img: slide_6, text: "accessories", link: "Accessories" },
  ];

  return (
    <section>
      <Swiper
        spaceBetween={20}
        className="!p-3 !py-6 !-mx-3"
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
        {slides.map(({ img, text, link }) => (
          <SwiperSlide
            key={img}
            className="bg-gray-100 rounded-xl cursor-pointer hover:bg-white active:bg-white !transition-all border border-white hover:border-amber-400 active:border-amber-400 group hover:shadow-box active:shadow-box shadow-gray-300 group"
          >
            <Link
              to={`shop/${link}`}
              className="flex items-center gap-3 py-6 px-4 "
            >
              <img src={img} className="w-[50px]" />
              <h1 className="text-sm group-hover:text-red-500 transition-colors">
                {text}
              </h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Navbar_Bottom;
