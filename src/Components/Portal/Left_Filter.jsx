import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import FilterSection from "../../ReuseableComponents/FilterSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleFilterMenuState } from "../../Store/PortalSlice";

const Left_Filter = () => {
  const { filterMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  const action = useDispatch();

  return (
    <AnimatePresence>
      {filterMenuState && (
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: 0, transition: { delay: 0.2 } }}
          exit={{ left: "-100%" }}
          className="absolute z-10 w-full sm:w-[300px] sm:h-full bg-white pt-10 pb-5 px-6 h-full top-0 overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-2 pb-3 ">
            <h1 className="uppercase font-bold text-xl">filter by</h1>
            <button
              className="hover:bg-black hover:text-white cursor-pointer w-[30px] h-[30px] leading-[30px] rounded-full active:scale-90 transition-all active:bg-black active:text-white"
              onClick={() => action(toggleFilterMenuState(false))}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
          <FilterSection />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Left_Filter;
