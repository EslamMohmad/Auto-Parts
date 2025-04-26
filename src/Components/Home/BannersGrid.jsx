import BannersGrid_Slider from "./BannersGrid_Slider";

import img_1 from "../../Assets/Home/BannersGrid/bannar (1).jpg";
import img_2 from "../../Assets/Home/BannersGrid/bannar (2).jpg";
import img_3 from "../../Assets/Home/BannersGrid/bannar (3).jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Shop_Now_Button from "../../ReuseableComponents/Shop_Now_Button";
import { Link } from "react-router-dom";

const BannarContent = ({ imgSrc, heading, text, link }) => {
  return (
    <div className="relative row-span-1 group overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-4 uppercase absolute z-[1] top-1/2 left-10 -translate-y-1/2 justify-center items-start w-[max-content]">
        <h1 className="relative text-xl transition-all text-amber-300">
          {heading}
        </h1>
        <h6 className="relative text-white text-[11px] leading-3 delay-500 transition-all">
          {text}
        </h6>
        <Link
          to={link}
          className="rounded-2xl text-[11px] uppercase outline-none cursor-pointer text-white hover:text-red-500 active:text-red-500 transition-colors mt-6 group/vibration"
        >
          read more
          <FontAwesomeIcon
            className="ml-3 group-hover/vibration:animate-vibration"
            icon="fa-solid fa-arrow-right-long"
          />
        </Link>
      </div>
      <img
        src={imgSrc}
        className="h-full w-full group-hover:scale-105  group-active:scale-105 transition-transform"
      />
    </div>
  );
};

const BannersGrid = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-6 sm:grid-rows-4 lg:grid-rows-2 gap-4 max-h-max sm:max-h-[1200px] lg:max-h-[800px]">
        <BannersGrid_Slider />
        <div className="relative col-span-1 row-span-2 group overflow-hidden rounded-2xl">
          <img
            src={img_1}
            className="w-full h-full group-hover:scale-105  group-active:scale-105  transition-transform"
          />
          <div className="flex flex-col gap-3 uppercase absolute top-10 left-1/2 -translate-x-1/2 justify-center items-center w-[max-content]">
            <h1 className="relative text-2xl transition-all text-amber-300">
              better brakes
            </h1>
            <h6 className="relative text-white text-[11px] leading-11 delay-500 transition-all">
              best sellers brakes system
            </h6>
            <Shop_Now_Button link={"shop/Brakes Systems"} />
          </div>
        </div>
        <BannarContent
          imgSrc={img_2}
          heading="best sellers"
          text={"projector headlights"}
          link="shop/Headlights"
        />
        <BannarContent
          imgSrc={img_3}
          heading="car wheels"
          text={"sport edition"}
          link="shop/Tires & Wheels"
        />
      </div>
    </section>
  );
};

export default BannersGrid;
