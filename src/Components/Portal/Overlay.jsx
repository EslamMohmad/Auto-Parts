import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeOverlay } from "../../Store/PortalSlice.js";
import { useEffect } from "react";

const Overlay = ({ children }) => {
  const { overlayState, newsLetterPopupState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );
  const action = useDispatch();

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
          exit={{ opacity: 0 }}
          className={`fixed top-0 left-0 w-full h-full backdrop-blur-[5px] z-10`}
          onClick={() => !newsLetterPopupState && action(closeOverlay())}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
