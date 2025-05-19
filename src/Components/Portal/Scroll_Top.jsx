import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Circle = () => {
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    function scrollHandler() {
      const winScroll = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = Math.round((winScroll / height) * 100);

      setScrollValue(scrolled);
    }

    window.addEventListener("scroll", scrollHandler);
    //clean up
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <svg className="progress-circle svg-content" viewBox="-1 -1 102 102">
      <path
        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        className="rang"
        style={{
          fill: "transparent",
          stroke: "red",
          strokeWidth: "4",
          strokeDasharray: "307",
          strokeDashoffset: `${307 - (scrollValue / 100) * 307}`,
          // transition: "all 100ms linear",
        }}
      ></path>
    </svg>
  );
};

const Scroll_Top = () => {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    function onScrollFunc() {
      const scroll = window.scrollY;

      if (scroll >= 200) {
        setScrollTop(true);
      } else setScrollTop(false);
    }

    document.addEventListener("scroll", onScrollFunc);

    return () => document.body.removeEventListener("scroll", onScrollFunc);
  }, [scrollTop]);

  return (
    <AnimatePresence>
      {scrollTop && (
        <motion.button
          initial={{ opacity: 0, y: "-10px" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-10px" }}
          className="fixed bottom-9 right-5 bg-white w-[50px] h-[50px] leading-[50px] text-center z-3 text-red-500 rounded-full group cursor-pointer "
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Circle />
          <FontAwesomeIcon
            icon="fa-solid fa-chevron-up"
            className="group-hover:-translate-y-3 transition-transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Scroll_Top;
