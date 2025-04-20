import Accessories from "../../Assets/Shop/Accessories.webp";
import Automotive_Rims from "../../Assets/Shop/Automotive Rims.webp";
import Brakes_Systems from "../../Assets/Shop/Brakes Systems.webp";
import Headlights from "../../Assets/Shop/Headlights.jpg";
import Tires_and_Wheels from "../../Assets/Shop/Tires & Wheels.jpg";
import Car_Audio_Systems from "../../Assets/Shop/Car Audio Systems.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
  const categoriesObject = {
    Accessories: Accessories,
    "Automotive Rims": Automotive_Rims,
    "Brakes Systems": Brakes_Systems,
    Headlights: Headlights,
    "Tires & Wheels": Tires_and_Wheels,
    "Car Audio Systems": Car_Audio_Systems,
  };

  const modifyArray = categories.map((category) => ({
    ...category,
    img: categoriesObject[category.name],
  }));

  return (
    <Swiper
      spaceBetween={60}
      breakpoints={{
        1350: { slidesPerView: 5 },
        1200: { slidesPerView: 4 },
        660: { slidesPerView: 3 },
        450: { slidesPerView: 2, pagination: false },
        0: { slidesPerView: 1 },
      }}
      modules={[Autoplay]}
      autoplay={{ pauseOnMouseEnter: true }}
      speed={1000}
      className="w-3/4 -top-20"
    >
      {modifyArray.map((category) => (
        <SwiperSlide key={category.name} className="group">
          <Link to={`../shop/${category.name}`}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={category.img}
                className="max-h-[170px] w-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="text-sm font-bold mt-6 text-center hover:text-red-500 active:text-red-500 transition-colors">
              {category.name}
            </h4>
            <p className="text-center text-sm my-3 text-black/60">
              {category.productsAmount} products
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Categories;
