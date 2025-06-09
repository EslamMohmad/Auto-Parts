import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "../../Hooks/useMediaQuery";
import SearchResults from "../Search/SearchResults";
import SearchTags from "../../ReuseableComponents/SearchTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setInputSearchStates, setSearchState } from "../../Store/SearchSlice";

const Searchbar = () => {
  const { searchState } = useSelector(({ SearchSlice }) => SearchSlice);

  const isTablet = useMediaQuery("(max-width: 1024px)");

  const action = useDispatch();

  return (
    <AnimatePresence>
      {searchState.state && (
        <motion.div
          initial={{ top: "-100%" }}
          animate={{ top: isTablet ? "172px" : "156px" }}
          exit={{ top: "-100%" }}
          transition={{ duration: 0.5 }}
          className="absolute py-10  z-10 w-full bg-white left-0 shadow-bottom"
        >
          <div className="flex flex-col gap-5 md:gap-3 max-w-screen-2xl px-[25px] mx-auto">
            <div className="flex flex-col gap-7">
              <h6 className="uppercase text-[11px] text-gray-600">
                popular search:
              </h6>
              <SearchTags />
            </div>
            <SearchResults />
            <button
              className="relative bg-black text-white shadow-bottom border border-black/10 w-[50px] h-[50px] leading-[50px] text-center rounded-full cursor-pointer hover:bg-red-600 transition-colors ml-auto"
              onClick={() => (
                action(setSearchState({ state: false, value: "" })),
                action(
                  setInputSearchStates({ inputFocus: false, inputValue: "" })
                )
              )}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Searchbar;
