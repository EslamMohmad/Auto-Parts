import { Swiper, SwiperSlide } from "swiper/react";
import news_1 from "../../Assets/Home/Last News/news (1).jpg";
import news_2 from "../../Assets/Home/Last News/news (2).jpg";
import news_3 from "../../Assets/Home/Last News/news (3).jpg";
import news_4 from "../../Assets/Home/Last News/news (4).jpg";
import news_5 from "../../Assets/Home/Last News/news (5).jpg";
import news_6 from "../../Assets/Home/Last News/news (6).jpg";
import banner from "../../Assets/Home/Last News/banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

const LastNews = () => {
  const news = [
    {
      img: news_1,
      text: "lighting",
      heading: "growing in a recession: maximize sales in the parts department",
      paragraph:
        "Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit...",
      date: "08th jun 2024",
    },
    {
      img: news_2,
      text: "batteries power",
      heading: "growing in a recession: maximize sales in the parts department",
      paragraph:
        "Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit...",
      date: "04th jun 2024",
    },
    {
      img: news_3,
      text: "performance parts",
      heading: "growing in a recession: maximize sales in the parts department",
      paragraph:
        "Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit...",
      date: "15th may 2024",
    },
    {
      img: news_4,
      text: "performance parts",
      heading: "growing in a recession: maximize sales in the parts department",
      paragraph:
        "Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit...",
      date: "14th may 2024",
    },
    {
      img: news_5,
      text: "car tire",
      heading: "growing in a recession: maximize sales in the parts department",
      paragraph:
        "Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit...",
      date: "14th mar 2024",
    },
    {
      img: news_6,
      text: "batteries power",
      heading: "growing in a recession: maximize sales in the parts department",
      paragraph:
        "Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit...",
      date: "12th mar 2024",
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
        from last news
      </h1>
      <Swiper
        spaceBetween={30}
        loop
        autoplay
        modules={[Autoplay]}
        speed={1000}
        breakpoints={{
          1400: { slidesPerView: 4 },
          980: { slidesPerView: 3 },
          690: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {news.map(({ img, text, heading, paragraph, date }) => (
          <SwiperSlide key={img} className="group">
            <div className="flex flex-col gap-3 border-b border-b-black/15">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={img}
                  className="group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-black/40 uppercase text-[12px]">
                {text}
              </span>
              <h1 className="text-xl">{heading}</h1>
              <p className="text-black/60 text-[13px] mb-10">{paragraph}</p>
            </div>
            <div className="py-5 flex justify-between">
              <button className="text-[12px] capitalize cursor-pointer hover:text-red-600 active:text-red-600 transition-colors">
                read more{" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-right-long"
                  size="sm"
                  className="ml-1"
                />
              </button>
              <span className="text-[12px] text-black/50">{date}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative sm:my-10 rounded-2xl overflow-hidden">
        <img src={banner} className="min-h-[300px] object-cover" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl w-3/4">
          <h1 className="text-red-600 uppercase">best car servicing</h1>
          <p className="uppercase text-white text-[12px] my-5">
            experience the best car services un auto parts
          </p>
          <button className="bg-white py-3 px-7 rounded-3xl text-[11px] uppercase outline-none cursor-pointer hover:bg-red-500 active:bg-red-500 hover:text-white active:text-white transition-colors">
            learn more
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default LastNews;
