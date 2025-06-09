import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeOverlay } from "../../Store/PortalSlice.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useMediaQuery from "../../Hooks/useMediaQuery.js";

const Overlay = ({ children }) => {
  const {
    overlayState,
    newsLetterPopupState,
    authState,
    cartMenuState,
    userOptionsMenuState,
    wishlistState,
    productQuickViewState,
  } = useSelector(({ PortalSlice }) => PortalSlice);
  const action = useDispatch();

  const { pathname } = useLocation();

  const isMobile = useMediaQuery("(max-width : 640px)");

  const onClickHandler = () => {
    if (pathname.includes("checkout") && authState) return;

    !newsLetterPopupState && action(closeOverlay());
  };

  const overlayHandler = () => {
    return isMobile
      ? !cartMenuState &&
        !userOptionsMenuState &&
        !wishlistState &&
        !productQuickViewState &&
        !newsLetterPopupState
        ? "top-[60px] z-20"
        : "top-0 z-20"
      : "top-0 z-30";
  };

  useEffect(() => {
    if (overlayState) {
      document.body.classList.add("overflow-hidden");
    } else document.body.classList.remove("overflow-hidden");
  }, [overlayState]);

  return (
    <AnimatePresence>
      {overlayState && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.2 } }}
          className={`fixed ${overlayHandler()} left-0 w-full h-full backdrop-blur-[5px]`}
          onClick={onClickHandler}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
