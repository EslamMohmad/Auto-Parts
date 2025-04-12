import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetProducts from "../Hooks/useGetProducts";
import { Fragment, useState } from "react";
import { Autoplay, FreeMode, Grid, Navigation, Thumbs } from "swiper/modules";
import LoadingProduct from "./../ReuseableComponents/LoadingProduct";

const Shop_Category_Product = () => {
  const { category, product } = useParams();
  const { pathname } = useLocation();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const { products, loadingState } = useGetProducts(category);

  const { imgs } =
    products?.filter((object) => object?.heading === product)[0] || {};

  console.log(loadingState);

  const dynamicLinksArray = decodeURIComponent(pathname)
    .replace("/Auto-Parts", "home")
    .split("/");

  const staticLinksArray = ["home", "shop", "category", "product"];

  const linksHandler = (link) => {
    let result = "";
    switch (link) {
      case "home":
        result = "..";
        break;
      case "shop":
        result = "../shop";
        break;
      case "category":
        result = `../shop/${category}`;
        break;
    }
    return result;
  };

  return (
    <section>
      <ul className="flex py-8 items-center gap-3 text-[12px] text-black/60">
        {staticLinksArray.map((link, index) => (
          <Fragment key={`${index}`}>
            <li>
              {staticLinksArray.length - 1 !== index ? (
                <Link
                  to={linksHandler(link)}
                  className="hover:text-red-600 active:text-red-600 transition-colors"
                >
                  {dynamicLinksArray[index]}
                </Link>
              ) : (
                dynamicLinksArray[index]
              )}
            </li>
            {staticLinksArray.length - 1 !== index && (
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="xs" />
            )}
          </Fragment>
        ))}
      </ul>
      <div className="flex h-[80vh]">
        <div className="w-1/2 flex flex-col gap-5 mb-10">
          <Swiper
            onSlideChange={(e) => setActiveSlide(e.activeIndex)}
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            modules={[Navigation, Thumbs, FreeMode, Autoplay]}
            autoplay={{ delay: "3000", disableOnInteraction: false }}
            speed={800}
            className="border rounded-xl !w-full border-black/15 !h-3/4"
            style={{ zIndex: 0 }}
          >
            {imgs?.map((img) => (
              <SwiperSlide key={img}>
                <LoadingProduct state={loadingState?.isLoading} />
                <img src={img} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={() => setThumbsSwiper}
            modules={[FreeMode, Navigation, Thumbs, Grid]}
            freeMode={true}
            watchSlidesProgress={true}
            slidesPerView={imgs?.length || 1}
            spaceBetween={"24"}
            grid={{ rows: 1, fill: "row" }}
            className="!w-full !h-1/4"
          >
            {imgs?.map((img, index) => (
              <SwiperSlide
                key={img}
                className={`border ${
                  activeSlide === index ? "border-red-600" : "border-black/15"
                } rounded-xl overflow-hidden cursor-pointer hover:border-red-600 active:border-red-600 transition-colors`}
              >
                <img src={img} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-1/2"></div>
      </div>
    </section>
  );
};

export default Shop_Category_Product;
