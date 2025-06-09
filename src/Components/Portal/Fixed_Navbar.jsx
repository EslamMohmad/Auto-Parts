import { useEffect, useState } from "react";
import Navbar_Top from "../Navbar/Navbar_Top";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFixedNavbar } from "../../Store/PortalSlice";

const Fixed_Navbar = () => {
  const isHome =
    useLocation().pathname === "/Auto-Parts" ||
    useLocation().pathname === "/Auto-Parts/";

  const [scrollDownState, setScrollDownState] = useState(false);

  const action = useDispatch();
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

  useEffect(() => {
    action(setFixedNavbar(scrollDownState));
  }, [scrollDownState]);

  return (
    <AnimatePresence>
      {scrollDownState && (
        <motion.div
          initial={{ top: "-100%" }}
          animate={{ top: 0 }}
          exit={{ top: "-100%" }}
          transition={{ duration: 1.2 }}
          className={`fixed z-10 top-0 w-[100vw] shadow-bottom ${
            isHome ? "bg-white" : "bg-yellow-300"
          }`}
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
