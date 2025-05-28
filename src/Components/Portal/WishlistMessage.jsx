import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginMessage } from "../../Store/PortalSlice";
import { emptyWishList } from "../../Store/ProductsSlice";
const WishlistMessage = () => {
  const { loginMessageState } = useSelector(({ PortalSlice }) => PortalSlice);

  const { wishlistState } = useSelector(({ ProductsSlice }) => ProductsSlice);

  const width = 200;

  let [counter, setCounter] = useState(width);

  const action = useDispatch();

  useEffect(() => {
    let timer;
    if (loginMessageState) {
      if (counter > 0) {
        timer = setTimeout(() => setCounter((counter -= 2)), 20);
      } else
        action(loginMessage(false)), setCounter(width), action(emptyWishList());
    }
    return () => clearTimeout(timer);
  }, [counter, loginMessageState]);

  return (
    <AnimatePresence>
      {loginMessageState && (
        <motion.div
          initial={{ top: "-5%", zIndex: 10 }}
          animate={{ top: "8%", zIndex: 30 }}
          exit={{ top: "-5%", zIndex: 15 }}
          transition={{ duration: 0.2 }}
          className="fixed w-[200px] left-1/2 -translate-x-1/2 text-sm border border-black/20 bg-white shadow-box text-center  text-black/80 rounded-md overflow-hidden"
        >
          <div className="py-3 " style={{ width: width + "px" }}>
            <h4>{wishlistState.message}</h4>
          </div>
          <div
            style={{ width: counter + "px" }}
            className="h-[2px] w-full bg-green-500"
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishlistMessage;
