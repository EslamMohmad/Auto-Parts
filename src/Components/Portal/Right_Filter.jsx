import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import FilterSection from "../../ReuseableComponents/FilterSection";

const Right_Filter = () => {
  const { filterMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  return (
    <AnimatePresence>
      {filterMenuState && (
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: 0 }}
          exit={{ left: "-100%" }}
          className="absolute z-10 w-full sm:w-[300px] sm:h-full bg-white pt-10 pb-5 px-6 h-full top-0 overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="uppercase font-bold pb-3 text-xl">filter by</h1>
          <FilterSection />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Right_Filter;
