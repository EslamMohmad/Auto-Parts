import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { productDetails } from "../../Utils/Function";
import Rating from "../../ReuseableComponents/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Button_Title from "../../ReuseableComponents/Button_Title";
import { toggleProductQuickView } from "../../Store/PortalSlice";

const ProductSize = ({ size, setSize }) => {
  const defaultSelectRef = useRef();

  useEffect(() => {
    if (!size.value) defaultSelectRef.current.selected = true;
  }, [size.value]);

  const action = useDispatch();

  const sizes = [
    { value: 16, price: "$90.00", stock: 9 },
    { value: 18, price: "$100.00", stock: 3 },
    { value: 19, price: "$110.00", stock: 1 },
    { value: 20, price: "$120.00", stock: 7 },
  ];

  const selectInputHandler = (val) => {
    setSize(() => {
      const target = sizes.find(({ value }) => +val === value);
      if (target) return target;
      else return { value: "" };
    });
  };

  return (
    <>
      <div className="absolute translate-x-1/2 sm:translate-x-0 right-1/2 sm:right-0 -top-15 sm:-top-16 w">
        <button
          className="bg-white w-[45px] h-[45px] leading-[45px] text-center rounded-full cursor-pointer shadow-[0px_0px_15px_gray] transition-colors hover:bg-black active:bg-black hover:text-white active:text-white"
          onClick={() => action(toggleProductQuickView(false))}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" />
        </button>
      </div>
      <div className="pt-5 flex gap-5 items-center justify-between flex-wrap">
        <h6 className="font-bold text-sm whitespace-nowrap">
          size : {size.value} {size.value ? "inch" : ""}
        </h6>
        <div className="grow flex">
          <select
            className="py-3 px-5 rounded-3xl outline-none border border-black/20 text-[11px] text-black/60 first-letter:uppercase cursor-pointer mr-auto"
            onChange={({ target }) => selectInputHandler(target.value)}
          >
            <option ref={defaultSelectRef} value="choose an option">
              choose an option
            </option>
            {sizes.map(({ value, price }) => (
              <option
                value={value}
                key={price}
                className="text-[11px] text-black/60"
              >
                {value} inch
              </option>
            ))}
          </select>
          {size.value && (
            <button
              className="relative w-[40px] h-[40px] leading-[40px] text-center rounded-full active:text-white hover:text-white hover:bg-red-500 active:bg-red-500 group transition-colors cursor-pointer ml-auto"
              onClick={() => setSize({ value: "", price: "" })}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
              <Button_Title title="clear" />
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {size.value && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex justify-between items-center"
          >
            <p className="text-green-700 font-extralight text-sm">
              <FontAwesomeIcon icon="fa-regular fa-circle-check" size="xl" />
              <span className="ml-3">{size.stock} in stock</span>
            </p>
            <h1 className="text-2xl font-bold">{size.price}</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProductAmount = () => {
  let [amount, setAmount] = useState(1);

  return (
    <div className="flex items-center bg-gray-200  rounded-3xl p-2 w-[max-content]">
      <button
        className="cursor-pointer hover:bg-white hover:text-red-500 active:bg-white active:text-red-500  transition-colors w-[30px] h-[30px] leading-[30px] text-center rounded-full"
        onClick={() => amount > 1 && setAmount((amount -= 1))}
      >
        <FontAwesomeIcon icon="fa-solid fa-minus" size="xs" />
      </button>
      <div className="px-8">{amount}</div>
      <button
        className="cursor-pointer hover:bg-white hover:text-red-500 active:bg-white active:text-red-500 transition-colors w-[30px] h-[30px] leading-[30px] text-center rounded-full"
        onClick={() => setAmount((amount += 1))}
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" size="xs" />
      </button>
    </div>
  );
};

const ProductQuickView = () => {
  const { productQuickViewState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const [size, setSize] = useState({ value: "", price: "", stock: "" });

  const {
    categorie,
    heading,
    price: { after, before },
    imgs,
    rating,
    text,
    SKU,
    tags,
  } = productDetails;

  return (
    <AnimatePresence>
      {productQuickViewState && (
        <motion.div
          initial={{ opacity: 0, top: "-100%" }}
          animate={{
            opacity: 1,
            top: "50%",
            transition: { delay: 0.5 },
          }}
          exit={{ opacity: 0, top: "-100%", transition: { duration: 2 } }}
          className="bg-white absolute rounded-2xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:shadow-2xl p-3 flex flex-col md:flex-row w-[80%] h-[80%] md:h-auto md:w-[90%] md:max-w-[1000px]"
          onClick={(e) => e.stopPropagation()}
        >
          <Swiper
            slidesPerView={1}
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".quickView-prev-btn-swiper",
              nextEl: ".quickView-next-btn-swiper",
            }}
            autoplay={true}
            loop={true}
            speed="700"
            className="md:!w-1/2 !mx-0 h-[600px] sm:h-auto"
          >
            <button className="absolute top-1/2 -translate-y-1/2 left-5 z-[2] cursor-pointer w-[50px] h-[50px] leading-[50px] text-center rounded-full shadow-bottom-left bg-white hover:bg-black hover:text-white transition-colors hover:shadow-none quickView-prev-btn-swiper hidden md:block">
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
            {imgs.map((img) => (
              <SwiperSlide key={img}>
                <img src={img} className="h-full md:h-auto mx-auto" />
              </SwiperSlide>
            ))}
            <button className="absolute top-1/2 -translate-y-1/2 right-5 z-[2] cursor-pointer  w-[50px] h-[50px] leading-[50px] text-center rounded-full shadow-bottom-left bg-white hover:bg-black hover:text-white transition-colors hover:shadow-none quickView-next-btn-swiper hidden md:block">
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </Swiper>
          <div className="flex flex-col gap-5 md:w-1/2 p-5 overflow-auto md:max-h-[480px]">
            <h1 className="sm:text-2xl font-bold capitalize text-center">
              {heading}
            </h1>
            <div className="mx-auto">
              <Rating rating={rating} />
            </div>
            <div className="flex justify-center gap-3">
              <span>{after}</span>
              <span>{before}</span>
            </div>
            <p className="text-[11px] text-black/60 text-center">{text}</p>
            <ProductSize size={size} setSize={setSize} />
            <div className="flex gap-5 flex-wrap">
              <ProductAmount />
              <button
                className={`whitespace-nowrap border py-3 px-10 rounded-3xl uppercase text-sm grow ${
                  size.value
                    ? "cursor-pointer hover:bg-red-500 active:bg-red-500 hover:text-white active:text-white transition-colors hover:border-transparent active:border-transparent"
                    : "cursor-not-allowed"
                }`}
                disabled={!size.value}
              >
                add to cart
              </button>
            </div>
            <button
              className={`py-3.5 px-10 rounded-3xl uppercase text-[12px] bg-black text-white ${
                size.value
                  ? "cursor-pointer hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white transition-colors"
                  : "cursor-not-allowed"
              }`}
              disabled={!size.value}
            >
              buy it now
            </button>
            <div className="flex flex-col gap-2 text-[12px]">
              <h1 className="text-black/50">
                <span className="font-bold text-black">SKU : </span>
                {SKU}
              </h1>
              <h1 className="text-black/50">
                <span className="font-bold text-black">categories : </span>
                {categorie.map((item, idx) => (
                  <span
                    key={item}
                    className="capitalize hover:text-black active:text-black cursor-pointer"
                  >
                    {item} {categorie.length - 1 !== idx && " , "}
                  </span>
                ))}
              </h1>
              <h1 className="text-black/50">
                <span className="font-bold text-black">tags : </span>
                {tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="capitalize hover:text-black active:text-black cursor-pointer"
                  >
                    {tag} {tag.length - 1 !== idx && " , "}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
