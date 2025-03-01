import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeOverlay } from "../../Store/PortalSlice";

const Overlay = ({ children }) => {
  const { overlayState } = useSelector(({ PortalSlice }) => PortalSlice);
  const action = useDispatch();

  return (
    <AnimatePresence>
      {overlayState && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute top-0 left-0 w-full h-full backdrop-blur-[5px] z-10`}
          onClick={() => action(closeOverlay())}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
