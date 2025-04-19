import { Swiper, SwiperSlide } from "swiper/react";

import mark from "../../Assets/Home/Testimonial/mark.jpg";
import Rating from "../../ReuseableComponents/Rating";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { testimonials } from "../../Utils/Function";

const Testimonials = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: "300px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ".5" }}
      viewport={{ margin: "-100px", once: true }}
    >
      <h1 className="text-center font-bold text-2xl uppercase my-10">
        testimonials
      </h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        loop={true}
        breakpoints={{
          970: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        pagination={{ clickable: true, el: ".testimonials-pagination" }}
        className="!px-5 !-mx-5 !py-5"
        modules={[Pagination, Autoplay]}
        speed={1000}
        autoplay
      >
        {testimonials.map(
          ({ id, heading, img, text, info: { name, contry }, rating }) => (
            <SwiperSlide key={id}>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative">
                  <img src={img} className="max-w-[130px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-[30px] flex justify-center items-center h-[30px] rounded-full shadow-bottom-left bg-white">
                    <img src={mark} />
                  </div>
                </div>
                <div className="bg-gray-200/70 rounded-lg p-10 flex flex-col gap-4">
                  <Rating rating={rating} />
                  <h3 className="font-bold">{heading}</h3>
                  <p className="text-sm text-black/60">{text}</p>
                  <h6 className="text-[12px] capitalize">
                    <span className="font-extrabold">{name}</span> - from{" "}
                    {contry}
                  </h6>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <div className="testimonials-pagination hidden sm:flex gap-2 items-center [&>span]:cursor-pointer [&>span.swiper-pagination-bullet-active]:!bg-red-500 justify-center py-5"></div>
    </motion.section>
  );
};

export default Testimonials;
