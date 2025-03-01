import { AnimatePresence, motion } from "framer-motion";
import { toggleCartMenu } from "../../Store/PortalSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar_Top_Cart from "../Navbar/Navbar_Top_Cart";

import cart from "../../Assets/Cart_Menu/icon-cart.webp";

const CartMenu = () => {
  const { cartMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  const action = useDispatch();

  return (
    <AnimatePresence>
      {cartMenuState && (
        <motion.div
          className="absolute w-[80%] sm:w-[350px] h-full z-20 sm:z-10 bg-white pt-10 pb-5 px-6 flex flex-col items-center gap-16"
          initial={{ right: "-100%" }}
          animate={{ right: 0 }}
          exit={{ right: "-100%" }}
          onClick={(e) => action(toggleCartMenu(true), e.stopPropagation())}
        >
          <div className="flex gap-5 items-end mr-auto">
            <Navbar_Top_Cart />
            <h3 className="uppercase text-sm">shopping cart</h3>
          </div>
          <img src={cart} className="w-[120px]" />
          <div className="flex flex-col gap-6 text-sm justify-center items-center text-center">
            <h2>no products in the cart</h2>
            <p className="text-gray-400 w-[85%]">
              Your cart is currently empty. Let us help you find the perfect
              item!
            </p>
            <button className="uppercase py-4 px-10 rounded-4xl bg-gray-200 text-[11px] font-bold cursor-pointer hover:bg-red-500 transition-colors hover:text-white">
              continue shopping
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartMenu;
