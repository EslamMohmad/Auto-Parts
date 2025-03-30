import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../ReuseableComponents/Product";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Pagination } from "swiper/modules";

const FilterProductsRow = () => {
  const [selectedItems, setSelectedItems] = useState([
    { itemsType: "car audio systems", selected: true },
    { itemsType: "headlight", selected: false },
    { itemsType: "automotive rims", selected: false },
  ]);

  const selectedItemsHandler = (text) => {
    const result = selectedItems.map((object) => {
      if (object.itemsType === text) {
        return { itemsType: text, selected: true };
      }
      for (const key in object) {
        return { itemsType: object[key], selected: false };
      }
    });

    setSelectedItems(result);
  };

  return (
    <ul className="md:w-[max-content] lg:w-auto whitespace-nowrap">
      {selectedItems.map(({ itemsType, selected }) => (
        <li
          key={itemsType}
          className={`inline-block not-last-of-type:mr-5 py-1 px-5 cursor-pointer rounded-2xl transition-colors text-sm ${
            selected
              ? "text-red-600 bg-gray-300/50"
              : "text-black/25 hover:text-red-600 hover:bg-gray-300/50"
          }`}
          onClick={() => !selected && selectedItemsHandler(itemsType)}
        >
          {itemsType}
        </li>
      ))}
    </ul>
  );
};

const FilterProductsList = () => {
  const [selectedItems, setSelectedItems] = useState([
    { itemsType: "car audio systems", selected: true },
    { itemsType: "headlight", selected: false },
    { itemsType: "automotive rims", selected: false },
  ]);

  const [listState, setListState] = useState(false);

  const selectedItemsHandler = (text) => {
    const result = selectedItems.map((object) => {
      if (object.itemsType === text) {
        return { itemsType: text, selected: true };
      }
      for (const key in object) {
        return { itemsType: object[key], selected: false };
      }
    });
    setListState(false);
    return setSelectedItems(result);
  };

  return (
    <div className="relative w-full">
      <button
        className="uppercase text-sm bg-gray-200 w-full py-3 rounded-md text-black/50 flex justify-center"
        onClick={() => setListState(!listState)}
      >
        <span className="ml-auto">
          {selectedItems.find((object) => object.selected).itemsType}
        </span>
        <span className="ml-auto mr-3">
          {listState ? (
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" size="sm" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="sm" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {listState && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="absolute z-[1] w-full bg-white shadow-bottom overflow-hidden"
          >
            {selectedItems.map(({ itemsType, selected }) => (
              <li
                key={itemsType}
                className={`block w-full text-center py-3 px-5 cursor-pointer rounded-2xl transition-colors text-sm ${
                  selected
                    ? "text-red-600"
                    : "text-black/25 hover:text-red-600 active:text-red-600"
                }`}
                onClick={() => !selected && selectedItemsHandler(itemsType)}
              >
                {itemsType}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeaturedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = Array.from({ length: 12 }, (li, idx) => (li = idx));

  const isMobile = useMediaQuery("(max-width : 640px)");

  return (
    <motion.section
      initial={{ opacity: 0, y: "300px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ".5" }}
      viewport={{ margin: "-100px", once: true }}
    >
      <div className="py-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-6 items-center">
          <h1 className="uppercase text-2xl font-bold mx-auto sm:mx-0">
            featured products
            <span className="hidden sm:inline ml-6">|</span>
          </h1>

          {isMobile ? <FilterProductsList /> : <FilterProductsRow />}
          <div className="featured-products-pagination ml-auto hidden md:flex gap-2 items-center [&>span]:cursor-pointer [&>span.swiper-pagination-bullet-active]:!bg-red-500 !w-auto"></div>
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            1350: { slidesPerView: 5 },
            1200: { slidesPerView: 4 },
            860: { slidesPerView: 3 },
            450: { slidesPerView: 2, pagination: false },
            0: { slidesPerView: 1 },
          }}
          className="!py-8 !px-5 !-mx-5"
          style={{ zIndex: 0 }}
          onActiveIndexChange={(e) => setCurrentSlide(e.activeIndex)}
          autoplay={{ pauseOnMouseEnter: true, disableOnInteraction: true }}
          speed={1500}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true, el: ".featured-products-pagination" }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product}>
              <Product index={index} currentSlide={currentSlide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;
