import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const SearchMenu = () => {
  const { searchMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  const tags = ["aenean", "mauris", "dorman", "honda", "jsusto"];

  return (
    <AnimatePresence>
      {searchMenuState && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-[56px] w-full bg-white z-10 h-[calc(100vh_-_56px)]"
          onClick={(e) => e.stopPropagation()}
        >
          <form>
            <input
              type="text"
              placeholder="enter your keyword"
              className="placeholder:uppercase p-4 text-[12px] w-full text-center border-b border-gray-300 outline-none"
            />
          </form>
          <div className="py-10 px-5 flex flex-col gap-7">
            <h6 className="uppercase text-[11px] text-gray-600">
              popular search:
            </h6>
            <ul className="flex gap-3 flex-wrap">
              {tags.map((list) => (
                <li
                  key={list}
                  className="text-[11px] bg-gray-200 py-2 px-5 text-gray-500 cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                >
                  {list}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchMenu;
