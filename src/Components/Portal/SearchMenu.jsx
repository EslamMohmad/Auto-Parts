import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import SearchTags from "../../ReuseableComponents/SearchTags";
import SearchResults from "../Search/SearchResults";
import SearchInput from "../../ReuseableComponents/SearchInput";

const SearchMenu = () => {
  const { searchMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  return (
    <AnimatePresence>
      {searchMenuState && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          className={`absolute w-full bg-white z-10 h-[calc(100%_-_63px)]`}
          onClick={(e) => e.stopPropagation()}
        >
          <form>
            <SearchInput
              className="p-4 text-[12px] w-full text-center border-b border-gray-300 outline-none"
              name="mobile-search"
              placeholder="search for products, brands and more"
            />
          </form>
          <div className="py-10 px-5 flex flex-col gap-7">
            <h6 className="uppercase text-[11px] text-gray-600">
              popular search:
            </h6>
            <SearchTags />
          </div>
          <div className="px-5">
            <SearchResults />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchMenu;
