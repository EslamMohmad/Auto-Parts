import bannerOne from "../../Assets/HomeProducts/productsBanner (1).jpg";
import bannerTwo from "../../Assets/HomeProducts/productsBanner (2).jpg";
import Shop_Now_Button from "../../ReuseableComponents/Shop_Now_Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsSlider from "./ProductsSlider";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const List = ({ categories }) => {
  const isMobile = useMediaQuery("(max-width : 640px)");
  const [listState, setListState] = useState(isMobile ? false : true);

  useEffect(() => {
    if (isMobile) {
      setListState(false);
    } else setListState(true);
  }, [isMobile]);

  return (
    <div className="w-full sm:w-[48%] lg:w-1/5">
      <div
        className="uppercase sm:text-xl font-bold mb-8 flex justify-between items-center bg-gray-200 sm:bg-transparent p-2 sm:px-0 rounded-md select-none"
        onClick={() => setListState(!listState)}
      >
        {categories.heading}
        {isMobile &&
          (listState ? (
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" size="sm" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="sm" />
          ))}
      </div>
      <AnimatePresence>
        {listState && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            <ul className="flex flex-col gap-3 ">
              {categories.categories.map((li) => (
                <li
                  key={li}
                  className="text-gray-500 text-sm hover:text-red-500 active:text-red-500 select-none transition-colors cursor-pointer"
                >
                  {li}
                </li>
              ))}
            </ul>
            <button className="text-black/30 text-[12px] mt-8 hover:text-black active:text-black transition-colors cursor-pointer">
              shop all categories
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-right-long"
                className="ml-3"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsBanner = () => {
  const productsComInfo = [
    {
      categories: {
        heading: "Tires & Wheels",
        categories: [
          "michelin",
          "goodyear tires",
          "continental",
          "good tear",
          "tokohama",
          "toyo tires",
          "bridgestone",
          "casumina",
          "deestone",
        ],
      },
      banner: {
        img: bannerOne,
        heading: "from 200$",
        text: "michelin tires",
      },
      products: {
        slides: 10,
        speed: 1000,
      },
    },
    {
      categories: {
        heading: "Headlights",
        categories: [
          "multibeam led",
          "Projector headlights",
          "chevrolet",
          "peugeot",
          "toyota",
          "hyundai moto",
          "KIA moto",
          "lamborghini",
          "mercedes-Benz",
        ],
      },
      banner: {
        img: bannerTwo,
        heading: "multibeam led",
        text: "quality headlight",
      },
      products: {
        slides: 10,
        speed: 1500,
      },
    },
  ];

  return (
    <section>
      {productsComInfo.map(({ categories, banner, products }) => (
        <div
          key={categories.heading}
          className="flex flex-col sm:flex-row justify-between flex-wrap lg:flex-nowrap gap-5 py-10"
        >
          <List categories={categories} />
          <div className="relative text-center overflow-hidden rounded-2xl group w-full sm:w-[45%] lg:w-1/4">
            <img
              src={banner.img}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform group-active:scale-105 "
            />
            <div className="absolute top-1/5 left-1/2 -translate-x-1/2 flex flex-col gap-4 uppercase">
              <h2 className="text-amber-400">{banner.heading}</h2>
              <h1 className="text-xl text-white w-[max-content]">
                {banner.text}
              </h1>
              <div className="mt-[140px]">
                <Shop_Now_Button />
              </div>
            </div>
          </div>
          <ProductsSlider type={categories.heading} />
        </div>
      ))}
    </section>
  );
};

export default ProductsBanner;
