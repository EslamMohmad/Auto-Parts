import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import img from "../../Assets/Portal/newsletter-popup/img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleNewsLetterPopup } from "../../Store/PortalSlice";

const NewsLetters_Popup = () => {
  const { newsLetterPopupState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const action = useDispatch();

  return (
    <AnimatePresence>
      {newsLetterPopupState && (
        <motion.div
          initial={{ opacity: 0, top: "-100%" }}
          animate={{
            opacity: 1,
            top: "50%",
            transition: { delay: 0.5 },
          }}
          exit={{ opacity: 0, top: "-100%", transition: { duration: 2 } }}
          className="bg-white absolute rounded-2xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col sm:flex-row overflow-hidden w-[300px] sm:w-[600px] lg:w-[900px] rounded-2xl ">
            <img src={img} className="sm:w-1/2 sm:h-[500px] object-cover" />
            <div className="p-7 sm:pt-20 sm:px-10 sm:pb-5 flex flex-col gap-5 items-center sm:w-1/2">
              <h6 className="text-red-500 font-extralight capitalize">
                sign up newsletter
              </h6>
              <h1 className="uppercase font-bold text-2xl text-center">
                get 10% discount
              </h1>
              <p className="text-sm text-gray-600 text-center">
                sign up for newsletter to receive special offers and exclusive
                news about products
              </p>
              <div className="mt-auto">
                <input
                  type="checkbox"
                  id="disable_News_popup"
                  className="accent-black w-[15px] h-[15px]"
                />
                <label
                  htmlFor="disable_News_popup"
                  className="ml-3 text-gray-400 text-[11px] !font-extralight first-letter:capitalize select-none"
                >
                  don't show this popup again
                </label>
              </div>
            </div>
          </div>
          <div className="absolute right-2 sm:right-0 top-2 sm:-top-16 w">
            <button
              className="bg-white w-[45px] h-[45px] leading-[45px] text-center rounded-full cursor-pointer shadow-[0px_0px_15px_gray] transition-colors hover:bg-black   active:bg-black hover:text-white active:text-white"
              onClick={() => action(toggleNewsLetterPopup(false))}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsLetters_Popup;
