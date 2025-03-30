import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import barsImg from "../Assets/HomeProducts/bars.svg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "./../Hooks/useMediaQuery";
import {
  toggleLoadingState,
  toggleProductAddToCard,
  toggleProductCompare,
  toggleProductQuickView,
} from "../Store/PortalSlice";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../Utils/Function";
import Rating from "./Rating";
import Button_Title from "./Button_Title";

const Button = ({ icon, text, method, index }) => {
  const [isLoading, setIsLoading] = useState(false);

  const action = useDispatch();

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(
        () => (
          setIsLoading(false),
          action(method(true)),
          action(toggleLoadingState(false))
        ),
        1000
      );
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <motion.button
      initial={{ opacity: 0, transform: "translatey(0)" }}
      animate={{ opacity: 1, transform: "translatey(-20px)" }}
      transition={{ delay: index / 15 + 0.2 }}
      onClick={() => (setIsLoading(true), action(toggleLoadingState(true)))}
      className={`relative w-[40px] h-[40px] leading-[40px] text-center ${
        isLoading ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      } rounded-full active:text-white hover:text-white hover:bg-red-500 active:bg-red-500 transition-colors cursor-pointer group block`}
    >
      {isLoading ? (
        <img src={barsImg} className="w-[15px] mx-auto" />
      ) : (
        <>
          <FontAwesomeIcon icon={icon} size="md" />
          <Button_Title title={text} />
        </>
      )}
    </motion.button>
  );
};

const Product = ({ currentSlide, index }) => {
  const { productQuickViewState, loadingState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const [optionsComState, setOptionComState] = useState(false);

  const isMobile = useMediaQuery("(max-width : 445px)");

  const {
    categorie,
    heading,
    price: { after, before },
    imgs,
    rating,
    sale,
  } = productDetails;

  const productOptions = [
    {
      icon: "fa-solid fa-truck-fast",
      text: "add to cart",
      method: (prop) => toggleProductAddToCard(prop),
    },
    {
      icon: "fa-solid fa-chart-simple",
      text: "compare",
      method: (prop) => toggleProductCompare(prop),
    },
    {
      icon: "fa-solid fa-expand",
      text: "quick view",
      method: (prop) => toggleProductQuickView(prop),
    },
  ];

  useEffect(() => {
    if (productQuickViewState) {
      setOptionComState(false);
    }
  }, [productQuickViewState]);

  return (
    <div
      className="relative flex flex-col gap-3 text-sm group/options"
      onMouseOver={() => setOptionComState(true)}
      onMouseLeave={() => !loadingState && setOptionComState(false)}
    >
      <img
        src={imgs[0]}
        className={`border border-gray-300 rounded-2xl object-cover transition-all duration-500 ${
          optionsComState ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={imgs[1]}
        className={`border absolute top-0 left-0 border-gray-300 rounded-2xl object-cover transition-all duration-500 ${
          optionsComState ? "opacity-100" : "opacity-0"
        }`}
      />

      <button className="absolute right-5 top-5 text-gray-300 hover:text-black transition-colors cursor-pointer group">
        <FontAwesomeIcon icon="fa-solid fa-heart" />
        <Button_Title title="whishlist" />
      </button>
      <div
        className={`flex flex-col gap-3 ${"group-hover/options:-translate-y-20 group-hover/options:shadow-top"} bg-white py-8   relative z-10 transition-all`}
      >
        <h1 className="text-gray-400">{categorie[0]}</h1>
        <p className="h-[40px] text-ellipsis overflow-hidden whitespace-break-spaces">
          {heading}
        </p>
        <div className="flex gap-2">
          <Rating rating={rating} />
          <span>({rating})</span>
        </div>
        <div className="flex gap-4 text-sm items-center pr-3">
          <h1>{after}</h1>
          <h2 className="text-gray-300">{before}</h2>
          <div className="bg-red-500 text-white py-1.5 px-2 rounded-sm text-[10px] font-bold tracking-wider relative ml-auto">
            {sale}
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
              {productOptions.map(({ icon, text, method }, index) => {
                const props = {
                  icon,
                  text,
                  method,
                  index,
                };
                return <Button key={text} {...props} />;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Product;
