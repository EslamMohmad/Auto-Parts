import { Swiper, SwiperSlide } from "swiper/react";

import testimonial_1 from "../../Assets/Home/Testimonial/testimonial (1).jpg";
import testimonial_2 from "../../Assets/Home/Testimonial/testimonial (2).jpg";
import testimonial_3 from "../../Assets/Home/Testimonial/testimonial (3).jpg";

import mark from "../../Assets/Home/Testimonial/mark.jpg";
import Rating from "../../ReuseableComponents/Rating";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      heading: "great price & services",
      img: testimonial_1,
      rating: 3,
      text: "automize rice crackers are a staple in my pantry. They are a healthier alternative to traditional crackers and chips, but still satisfy my craving for something spicy and crunchy. Chilli garlic flavor is my personal favorite - it's so delicious!",
      info: { name: "jennifer", contry: "california" },
    },
    {
      heading: "great price & services",
      img: testimonial_2,
      rating: 5,
      text: "i have been using Automize's personal care products for a while now, and I must say, I am impressed. The quality is top-notch, and the natural ingredients make me feel good about what I'm putting on my skin. Highly recommend!",
      info: { name: "christopher", contry: "new orleans" },
    },
    {
      heading: "great price & services",
      img: testimonial_3,
      rating: 4,
      text: "as a vegetarian, I always miss out on the classic breakfast staple of omelettes. But with Automize Store's Veg Omelette premix, I can finally enjoy a tasty and protein-packed breakfast option. The mix is easy to use and customize with my favorite veggies.",
      info: { name: "jessica", contry: "chicago" },
    },
  ];

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
        speed={2500}
        autoplay
      >
        {testimonials.map(
          ({ heading, img, text, info: { name, contry }, rating }) => (
            <SwiperSlide key={name}>
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
