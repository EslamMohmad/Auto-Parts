import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import WishlistTable from "../../ReuseableComponents/WishlistTable";
const Wishlist = () => {
  const { wishlistState } = useSelector(({ PortalSlice }) => PortalSlice);
  const { wishlistProducts } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  return (
    <AnimatePresence>
      {wishlistState && (
        <motion.div
          initial={{ top: "-50%" }}
          animate={{
            top: "50%",
          }}
          exit={{ top: "-50%" }}
          transition={{ delay: 0.2 }}
          className="bg-white fixed z-10 rounded-2xl -translate-y-1/2 left-1/2 -translate-x-1/2  sm:shadow-2xl shadow-box overflow-hidden p-5 w-3/4 sm:w-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-bold py-5 text-xl">wishlist</h1>
            <span className="text-sm text-black/40 hover:text-black active:text-black cursor-pointer transition-colors">
              {Object.values(wishlistProducts).length} remove all
            </span>
          </div>
          <div className="overflow-y-auto overflow-x-hidden pr-3 h-[500px]">
            <WishlistTable />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Wishlist;
