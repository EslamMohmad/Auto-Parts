import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../Assets//HomeProducts/product.jpg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "./../Hooks/useMediaQuery";

const ContentTitle = ({ title }) => {
  return (
    <div className="absolute z-50 -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-2 rounded-md opacity-0 group-active:opacity-100 group-hover:opacity-100 scale-50 group-hover:scale-100 group-active:scale-100 text-[10px] transition-all font-bold tracking-wider w-[max-content] leading-5">
      {title}
      <div className="absolute rotate-45 -z-10 -bottom-1 left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-red-500"></div>
    </div>
  );
};

const Product = ({ currentSlide, index }) => {
  const [optionsComState, setOptionComState] = useState(false);

  const isMobile = useMediaQuery("(max-width : 445px)");

  const stars = Array.from({ length: 5 }, () => (
    <FontAwesomeIcon icon="fa-solid fa-star" size="xs" />
  ));

  const productOptions = [
    { icon: "fa-solid fa-truck-fast", method: "add to cart" },
    { icon: "fa-solid fa-chart-simple", method: "compare" },
    { icon: "fa-solid fa-expand", method: "quick view" },
  ];

  return (
    <div
      className="relative flex flex-col gap-3 text-sm group/options"
      onMouseOver={() => setOptionComState(true)}
      onMouseOut={() => setOptionComState(false)}
    >
      <img
        src={img}
        className="border border-gray-300 rounded-2xl object-cover"
      />
      <button className="absolute right-5 top-5 text-gray-300 hover:text-black transition-colors cursor-pointer group">
        <FontAwesomeIcon icon="fa-solid fa-heart" />
        <ContentTitle title="whishlist" />
      </button>
      <div className="flex flex-col gap-3 group-hover/options:-translate-y-20 bg-white py-8 group-hover/options:shadow-[0px_-5px_10px_-15px_lightgray] transition-transform relative z-10">
        <h1 className="text-gray-400">automotive rims</h1>
        <p className="h-[40px] text-ellipsis overflow-hidden whitespace-break-spaces">
          dorman steel wheel compatible with select honda models
        </p>
        <ul className="flex gap-1 mr-2">
          {stars.map((star, idx) => (
            <li key={star + idx} className="text-gray-300">
              {star}
            </li>
          ))}
          ({stars.length})
        </ul>
        <div className="flex gap-4 text-sm items-center pr-3">
          <h1>$18.00</h1>
          <h2 className="text-gray-300">$20.00</h2>
          <div className="bg-red-500 text-white py-1.5 px-2 rounded-sm text-[10px] font-bold tracking-wider relative ml-auto">
            -10%
            <div className="absolute rotate-45 top-1/2 -left-1  -translate-y-1/2 w-[8px] h-[8px] bg-red-500"></div>
          </div>
        </div>
        <AnimatePresence>
          {(optionsComState || (isMobile && currentSlide === index)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 fixed -bottom-10"
            >
              {productOptions.map(({ icon, method }, index) => (
                <motion.button
                  initial={{ opacity: 0, transform: "translatey(0)" }}
                  animate={{ opacity: 1, transform: "translatey(-20px)" }}
                  transition={{ delay: index / 15 + 0.2 }}
                  key={method}
                  className="relative w-[40px] h-[40px] leading-[40px] text-center bg-gray-200 rounded-full active:text-white hover:text-white hover:bg-red-500 active:bg-red-500 transition-colors cursor-pointer group block"
                >
                  <FontAwesomeIcon icon={icon} size="md" />
                  <ContentTitle title={method} />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Product;
