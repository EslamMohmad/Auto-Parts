import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

const LoadingProduct = ({ state }) => {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute top-0 bg-white z-10 w-full h-[104%] rounded-xl flex justify-center items-center border border-black/10"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-gear"
            size="3x"
            className="animate-spin text-black/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingProduct;
