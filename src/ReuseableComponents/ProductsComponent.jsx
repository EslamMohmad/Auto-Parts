import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./Product";
import { useState } from "react";
import LoadingProduct from "./LoadingProduct";

const ProductsComponent = ({
  heading,
  products,
  filterListComponent,
  loadingState,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="py-8">
      <div className="flex flex-wrap lg:flex-nowrap gap-6 items-center">
        <h1 className="uppercase text-2xl font-bold mx-auto sm:mx-0">
          {heading}
          <span className="hidden sm:inline ml-6">|</span>
        </h1>

        {filterListComponent ? filterListComponent : ""}
        <div className="featured-products-pagination ml-auto hidden md:flex gap-2 items-center [&>span]:cursor-pointer [&>span.swiper-pagination-bullet-active]:!bg-red-500 !w-auto"></div>
      </div>
      <Swiper
        spaceBetween={24}
        slidesPerView={5}
        breakpoints={{
          1350: { slidesPerView: 5 },
          1200: { slidesPerView: 4 },
          860: { slidesPerView: 3 },
          450: { slidesPerView: 2, pagination: false },
          0: { slidesPerView: 1 },
        }}
        className="!py-8 !px-6 !-mx-6 "
        style={{ zIndex: 0 }}
        onActiveIndexChange={(e) => setCurrentSlide(e.activeIndex)}
        autoplay={{ pauseOnMouseEnter: true, disableOnInteraction: true }}
        speed={1500}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, el: ".featured-products-pagination" }}
      >
        {products?.map((product, index) => (
          <SwiperSlide key={product?.heading}>
            <Product
              currentSlide={currentSlide}
              details={product}
              index={index}
              component="featured products"
            />
            <LoadingProduct state={loadingState} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsComponent;
