import { useEffect, useState } from "react";
import Navbar_Top from "../Navbar/Navbar_Top";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "../../Hooks/useMediaQuery";

const Fixed_Navbar = () => {
  const { cartMenuState, newsLetterPopupState, mainMenuState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const [scrollDownState, setScrollDownState] = useState(false);

  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1024px)");

  //scroll => show fixed navbar
  useEffect(() => {
    function onScrollFunc() {
      const scroll = window.scrollY;

      if (scroll >= 200) {
        setScrollDownState(true);
      } else setScrollDownState(false);
    }

    document.addEventListener("scroll", onScrollFunc);

    return () => document.body.removeEventListener("scroll", onScrollFunc);
  }, [scrollDownState]);

  return (
    <AnimatePresence>
      {scrollDownState && (
        <motion.div
          initial={{ top: "-100%" }}
          animate={{ top: 0 }}
          exit={{ top: "-100%" }}
          transition={{ duration: 1.2 }}
          className={`fixed top-0 w-[100vw] shadow-bottom ${
            cartMenuState || newsLetterPopupState || (isTablet && mainMenuState)
              ? "z-10"
              : "z-20"
          } `}
        >
          <div className="max-w-screen-2xl mx-auto ">
            <Navbar_Top fixedNavbar={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Fixed_Navbar;
