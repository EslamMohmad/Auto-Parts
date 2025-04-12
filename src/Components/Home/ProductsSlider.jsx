import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../ReuseableComponents/Product";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import useGetProducts from "../../Hooks/useGetProducts";
import LoadingProduct from "../../ReuseableComponents/LoadingProduct";

const ProductsSlider = ({ type }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { products, loadingState, setLoadingState } = useGetProducts(type);

  useEffect(() => {
    !products.length && !loadingState && setLoadingState(true);
  }, [loadingState]);

  return (
    <div className="w-full lg:w-[calc(100%_-_50%)]">
      <Swiper
        spaceBetween="24"
        autoplay={{ pauseOnMouseEnter: true }}
        speed={1500}
        modules={[Autoplay]}
        breakpoints={{
          1265: { slidesPerView: 3 },
          1024: { slidesPerView: 2 },
          880: { slidesPerView: 3 },
          450: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        style={{ zIndex: 0 }}
        onActiveIndexChange={(e) => setCurrentSlide(e.activeIndex)}
        className="!p-6 sm:!px-6 !-m-6"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Product currentSlide={currentSlide} details={product} />
            <LoadingProduct state={loadingState} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
