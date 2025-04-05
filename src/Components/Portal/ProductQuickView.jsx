import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { productDetails } from "../../Utils/Function";
import Rating from "../../ReuseableComponents/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Navigation } from "swiper/modules";
import { forwardRef, useEffect, useRef, useState } from "react";
import Button_Title from "../../ReuseableComponents/Button_Title";
import {
  toggleCartMenu,
  toggleProductQuickView,
} from "../../Store/PortalSlice";
import Process_Button from "../../ReuseableComponents/Process_Button";
import { addProductToCart } from "../../Store/CartSlice";

const ProductSize = ({ size, setSize }) => {
  const defaultSelectRef = useRef();

  useEffect(() => {
    if (!size.value) defaultSelectRef.current.selected = true;
  }, [size.value]);

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
      <div className="pt-5 flex gap-5 items-center justify-between flex-wrap">
        <h6 className="font-bold text-sm whitespace-nowrap">
          size : {size.value} {size.value ? "inch" : ""}
        </h6>
        <div className="grow flex">
          <select
            name="product-quick-view-select-size"
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

const ProductAmount = forwardRef((_, ref) => {
  let [amount, setAmount] = useState(1);

  return (
    <div className="flex items-center bg-gray-200  rounded-3xl p-2 w-[max-content]">
      <button
        className="cursor-pointer hover:bg-white hover:text-red-500 active:bg-white active:text-red-500  transition-colors w-[30px] h-[30px] leading-[30px] text-center rounded-full"
        onClick={() => amount > 1 && setAmount((amount -= 1))}
      >
        <FontAwesomeIcon icon="fa-solid fa-minus" size="xs" />
      </button>
      <div className="px-8" ref={ref}>
        {amount}
      </div>
      <button
        className="cursor-pointer hover:bg-white hover:text-red-500 active:bg-white active:text-red-500 transition-colors w-[30px] h-[30px] leading-[30px] text-center rounded-full"
        onClick={() => setAmount((amount += 1))}
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" size="xs" />
      </button>
    </div>
  );
});

const ProductQuickView = () => {
  const { productQuickViewState, loadingState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const { productQuickView } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const [size, setSize] = useState({ value: "", price: "", stock: "" });

  const productAmountRef = useRef();

  const action = useDispatch();

  const addProductToCartHandler = () => {
    const productInfo = {
      ...productQuickView,
      size,
      amount: productAmountRef.current?.textContent,
    };
    action(addProductToCart(productInfo));
  };

  return (
    <AnimatePresence>
      {productQuickViewState && (
        <motion.div
          initial={{ opacity: 0, top: "-20%" }}
          animate={{
            opacity: 1,
            top: "50%",
            transition: { delay: 0.5 },
          }}
          exit={{ opacity: 0, top: "20%", transition: { duration: 0.2 } }}
          className="bg-white absolute rounded-2xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:shadow-2xl p-3 flex flex-col md:flex-row w-[80%] h-[80%] md:h-auto md:w-[90%] md:max-w-[1000px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute translate-x-1/2 sm:translate-x-0 right-1/2 sm:right-0 -top-15 sm:-top-16 w">
            <button
              className="bg-white w-[45px] h-[45px] leading-[45px] text-center rounded-full cursor-pointer shadow-[0px_0px_15px_gray] transition-colors hover:bg-black active:bg-black hover:text-white active:text-white"
              onClick={() => action(toggleProductQuickView(false))}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" />
            </button>
          </div>

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
            className="md:!w-1/2 !mx-0 h-[600px] sm:h-auto group"
          >
            <button className="absolute top-1/2 -translate-y-1/2 z-[2] cursor-pointer w-[50px] h-[50px] leading-[50px] text-center rounded-full shadow-bottom-left bg-white hover:bg-black hover:text-white hover:shadow-none quickView-prev-btn-swiper hidden md:block left-3 opacity-0 group-hover:left-5 group-hover:opacity-100 transition-all">
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
            {productQuickView?.imgs.map((img) => (
              <SwiperSlide key={img}>
                <img src={img} className="h-full md:h-auto mx-auto" />
              </SwiperSlide>
            ))}
            <button className="absolute top-1/2 -translate-y-1/2 z-[2] cursor-pointer  w-[50px] h-[50px] leading-[50px] text-center rounded-full shadow-bottom-left bg-white hover:bg-black hover:text-white hover:shadow-none quickView-next-btn-swiper hidden md:block right-3 opacity-0 group-hover:right-5 group-hover:opacity-100 transition-all">
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </Swiper>
          <div className="flex flex-col gap-5 md:w-1/2 [&::-webkit-scrollbar]:!w-1.5 p-5 overflow-auto md:max-h-[480px]">
            <h1 className="sm:text-2xl font-bold capitalize text-center">
              {productQuickView?.heading}
            </h1>
            <div className="mx-auto">
              <Rating rating={productQuickView?.rating} />
            </div>
            <div className="flex justify-center gap-3">
              <span>{productQuickView?.price.after}</span>
              <span>{productQuickView?.price.before}</span>
            </div>
            <p className="text-[11px] text-black/60 text-center">
              {productQuickView?.text}
            </p>
            <ProductSize size={size} setSize={setSize} />
            <div className="flex gap-5 flex-wrap">
              <ProductAmount ref={productAmountRef} />
              <Process_Button
                className={`whitespace-nowrap border py-3 px-10 rounded-3xl uppercase text-sm grow text-center ${
                  size.value
                    ? `cursor-pointer hover:bg-red-500 ${
                        loadingState.state &&
                        loadingState.method === "add to cart"
                          ? "bg-red-500 border-transparent"
                          : ""
                      } active:bg-red-500 hover:text-white active:text-white transition-colors hover:border-transparent active:border-transparent`
                    : "cursor-not-allowed"
                }`}
                disabled={!size.value}
                methodname="add to cart"
                afterloading={[toggleCartMenu(true)]}
                clickable={size.value}
                outermethod={addProductToCartHandler}
              >
                add to cart
              </Process_Button>
            </div>
            <Process_Button
              className={`py-3.5 px-10 rounded-3xl uppercase text-[12px] bg-black text-white text-center ${
                size.value
                  ? `cursor-pointer hover:bg-red-500 hover:text-white ${
                      loadingState.state && loadingState.method === "buy it now"
                        ? "bg-red-500 border-transparent"
                        : ""
                    } active:bg-red-500 active:text-white transition-colors`
                  : "cursor-not-allowed"
              }`}
              disabled={!size.value}
              methodname="buy it now"
              clickable={size.value}
            >
              buy it now
            </Process_Button>
            <div className="flex flex-col gap-2 text-[12px]">
              <h1 className="text-black/50">
                <span className="font-bold text-black">SKU : </span>
                {productQuickView?.SKU}
              </h1>
              <h1 className="text-black/50">
                <span className="font-bold text-black">categories : </span>
                {productQuickView?.categorie.map((item, idx) => (
                  <span
                    key={item}
                    className="capitalize hover:text-black active:text-black cursor-pointer"
                  >
                    {item}{" "}
                    {productQuickView?.categorie.length - 1 !== idx && " , "}
                  </span>
                ))}
              </h1>
              <h1 className="text-black/50">
                <span className="font-bold text-black">tags : </span>
                {productQuickView?.tags.map((tag, idx) => (
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
