import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "../../ReuseableComponents/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Navigation } from "swiper/modules";
import { useState } from "react";
import { toggleProductQuickView } from "../../Store/PortalSlice";
import AddToCartButton from "../../ReuseableComponents/AddToCartButton";
import BuyItNowButton from "../../ReuseableComponents/BuyItNowButton";
import ProductSize from "../../ReuseableComponents/ProductSize";
import ProductAmount from "./../../ReuseableComponents/ProductAmount";

const ProductQuickView = () => {
  const { productQuickViewState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const { productQuickView } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const [size, setSize] = useState({ value: "", price: "", stock: "" });

  let [amount, setAmount] = useState(1);

  const action = useDispatch();

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
            {productQuickView?.imgs.map((img, idx) => (
              <SwiperSlide key={idx}>
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
            {productQuickView?.size.value && (
              <ProductSize
                size={size}
                setSize={setSize}
                details={productQuickView?.size}
              />
            )}
            <div className="flex gap-5 flex-wrap">
              <ProductAmount amount={amount} setAmount={setAmount} />
              <AddToCartButton
                product={productQuickView}
                amount={amount}
                size={size}
              />
            </div>
            <BuyItNowButton
              product={productQuickView}
              amount={amount}
              size={size}
            />
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
