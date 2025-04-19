import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "./../Hooks/useMediaQuery";
import {
  toggleProductAddToCard,
  toggleProductCompare,
  toggleProductQuickView,
} from "../Store/PortalSlice";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import Button_Title from "./Button_Title";
import Process_Button from "./Process_Button";
import { addProductToQuickView } from "../Store/ProductsSlice";
import { addProductToCart } from "../Store/CartSlice";
import { Link, useNavigate } from "react-router-dom";

const Button = ({
  icon,
  text,
  method,
  index,
  setOptionComState,
  component = "",
}) => {
  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  const handleFirstButton = () => {
    if (component === "featured products" && index === 0) {
      return text;
    } else {
      return (
        <>
          <FontAwesomeIcon icon={icon} size="md" />
          <Button_Title title={text} />
        </>
      );
    }
  };

  return (
    <Process_Button
      initial={{ opacity: 0, transform: "translatey(0)" }}
      animate={{ opacity: 1, transform: "translatey(-20px)" }}
      transition={{ delay: index / 15 + 0.2 }}
      afterloading={[...method(true)]}
      outermethod={() => setOptionComState(false)}
      methodname={text}
      clickable={true}
      className={`relative leading-[40px] text-center ${
        component === "featured products" && index === 0
          ? `grow w-[max-content] bg-black text-white ${
              loadingState.state && loadingState.method === text
                ? "bg-red-500 text-white"
                : "bg-black text-white"
            }`
          : `w-[40px] h-[40px] ${
              loadingState.state && loadingState.method === text
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-black"
            }`
      }  rounded-full active:text-white hover:text-white hover:bg-red-500 active:bg-red-500 transition-colors cursor-pointer group block`}
    >
      {handleFirstButton()}
    </Process_Button>
  );
};

const Product = ({ details, currentSlide, component = "" }) => {
  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  const { heading, id, rating, sale, price, imgs, categorie, size } =
    details || productDetails;

  const [optionsComState, setOptionComState] = useState(false);

  const isMobile = useMediaQuery("(max-width : 450px)");

  const navToProduct = useNavigate();

  const productOptions = [
    {
      icon:
        typeof size?.value !== "string"
          ? "fa-solid fa-check"
          : "fa-solid fa-truck-fast",
      text: typeof size?.value !== "string" ? "select option" : "add to cart",
      method: (prop) =>
        typeof size?.value === "string"
          ? [
              toggleProductAddToCard(prop),
              addProductToCart({ ...details, amount: 1 } || productDetails),
            ]
          : [() => navToProduct(`/Auto-Parts/shop/${categorie[0]}/${heading}`)],
    },
    {
      icon: "fa-solid fa-chart-simple",
      text: "compare",
      method: (prop) => [toggleProductCompare(prop)],
    },
    {
      icon: "fa-solid fa-expand",
      text: "quick view",
      method: (prop) => [
        toggleProductQuickView(prop),
        addProductToQuickView(details || productDetails),
      ],
    },
  ];

  return (
    <div
      className="relative flex flex-col gap-3 text-sm group/options "
      onMouseOver={() => setOptionComState(true)}
      onMouseLeave={() => !loadingState.state && setOptionComState(false)}
    >
      <img
        src={imgs[0]}
        loading="lazy"
        className={`border border-gray-300 rounded-2xl object-cover transition-all duration-500 ${
          optionsComState ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={imgs[1]}
        loading="lazy"
        className={`border absolute top-0 left-0 border-gray-300 rounded-2xl object-cover transition-all duration-500 ${
          optionsComState ? "opacity-100" : "opacity-0"
        }`}
      />
      <Process_Button
        clickable={true}
        outermethod={() => setOptionComState(false)}
        color="dark"
        className="absolute right-5 top-5 text-gray-300 hover:text-black transition-colors cursor-pointer group"
      >
        <FontAwesomeIcon icon="fa-solid fa-heart" />
        <Button_Title title="whishlist" />
      </Process_Button>
      <div
        className={`flex flex-col gap-3 ${"group-hover/options:-translate-y-20 group-hover/options:shadow-top"} ${
          optionsComState && loadingState.state && "-translate-y-20 shadow-top"
        } bg-white py-8 relative z-10 transition-all h-full`}
      >
        <Link
          to={`/Auto-Parts/shop/${categorie[0]}`}
          className="text-gray-400 hover:text-red-600"
        >
          {categorie[0]}
        </Link>
        <Link
          to={`/Auto-Parts/shop/${categorie[0]}/${heading}`}
          className="h-[40px] text-ellipsis overflow-hidden whitespace-break-spaces hover:text-red-600"
        >
          {heading}
        </Link>
        <div className="flex gap-2">
          <Rating rating={rating} />
          <span>({rating})</span>
        </div>
        <div className="flex gap-4 text-sm items-center pr-3">
          <h1>{price?.after}</h1>
          <h2 className="text-gray-300">{price?.before}</h2>
          {+sale ? (
            <div className="bg-red-500 text-white py-1.5 px-2 rounded-sm text-[10px] font-bold tracking-wider relative ml-auto">
              -{sale}%
              <div className="absolute rotate-45 top-1/2 -left-1  -translate-y-1/2 w-[8px] h-[8px] bg-red-500"></div>
            </div>
          ) : (
            ""
          )}
        </div>
        <AnimatePresence>
          {(optionsComState || (isMobile && currentSlide === +id - 1)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 fixed -bottom-10 w-full"
            >
              {productOptions.map(({ icon, text, method }, index) => {
                const props = {
                  icon,
                  text,
                  method,
                  index,
                  setOptionComState,
                };
                return <Button key={text} {...props} component={component} />;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Product;
