import { AnimatePresence, motion } from "framer-motion";
import { toggleCartMenu } from "../../Store/PortalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Navbar_Top_Cart from "../Navbar/Navbar_Top_Cart";
import cart from "../../Assets/Portal/Cart_Menu/icon-cart.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button_Title from "../../ReuseableComponents/Button_Title.jsx";
import { removeProductFromCart } from "../../Store/CartSlice.js";
import Process_Button from "../../ReuseableComponents/Process_Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { totalPrice } from "../../Utils/Function.js";

const RowProduct = ({ details }) => {
  const { id, imgs, heading, amount, size, categorie } = details;

  return (
    <div className="flex justify-between items-center border border-black/15 rounded-md p-1 pr-2.5 hover:shadow-bottom transition-shadow relative">
      <img src={imgs[0]} className="w-[30%]" />
      <div className="relative max-w-[115px]">
        <Link
          to={decodeURIComponent(`shop/${categorie[0]}/${heading}`)}
          className="text-sm overflow-hidden block text-ellipsis whitespace-nowrap hover:text-red-500 active:text-red-500 transition-colors cursor-pointer select-none"
        >
          {heading}
        </Link>
        <p className="text-[13px] my-1">
          <span className="text-gray-400 mr-2">{amount} </span> x
          <span className="ml-2">{size?.price}</span>
        </p>
      </div>
      <Process_Button
        clickable={true}
        afterloading={[removeProductFromCart(id)]}
        delay={200}
        className="relative group cursor-pointer w-[30px] h-[30px] leading-[30px] text-center hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white transition-colors rounded-full"
      >
        <FontAwesomeIcon icon="fa-regular fa-trash-can" size="sm" />
        <Button_Title title="delete" />
      </Process_Button>
    </div>
  );
};

const CartMenu = () => {
  const { cartMenuState } = useSelector(({ PortalSlice }) => PortalSlice);
  const { products } = useSelector(({ CartSlice }) => CartSlice);

  const action = useDispatch();

  const navto = useNavigate();

  return (
    <AnimatePresence>
      {cartMenuState && (
        <motion.div
          className="absolute w-[80%] sm:w-[350px] h-full  sm:z-10 bg-white pt-10 px-4 flex flex-col gap-16"
          initial={{ right: "-100%" }}
          animate={{ right: 0 }}
          exit={{ right: "-100%" }}
          transition={{ delay: 0.2 }}
          onClick={(e) => action(toggleCartMenu(true), e.stopPropagation())}
        >
          <div className="flex gap-5 items-end mr-auto">
            <Navbar_Top_Cart />
            <h3 className="uppercase text-sm">shopping cart</h3>
          </div>
          {!products.length ? (
            <div className="flex flex-col gap-5 items-center my-auto">
              <img src={cart} className="w-[120px]" />
              <div className="flex flex-col gap-6 text-sm justify-center items-center text-center">
                <h2>no products in the cart</h2>
                <p className="text-gray-400 w-[85%]">
                  Your cart is currently empty. Let us help you find the perfect
                  item!
                </p>
                <button
                  onClick={(e) =>
                    action(toggleCartMenu(false), e.stopPropagation())
                  }
                  className="uppercase py-4 px-10 rounded-4xl bg-gray-200 text-[11px] font-bold cursor-pointer hover:bg-red-500 active:bg-red-500 transition-colors hover:text-white active:text-white"
                >
                  continue shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 grow overflow-auto p-1 [&::-webkit-scrollbar]:!w-1.5 pr-3 border-t border-b py-5 border-black/10 rounded-md ">
                {products.map((product, index) => (
                  <RowProduct
                    key={product?.amount + "000" + index}
                    details={product}
                  />
                ))}
              </div>
              <div className="bg-gray-200 p-4 mt-auto -mx-4">
                <div className="uppercase flex justify-between items-center text-[13px] my-2">
                  subtotal{" "}
                  <span className="font-bold">
                    ${totalPrice(products).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => navto("cart")}
                  className="w-full py-3.5 text-[12px] font-bolder uppercase bg-white border rounded-md cursor-pointer border-black/20 transition-colors hover:bg-black active:bg-black hover:text-white active:text-white"
                >
                  view cart
                </button>
                <button
                  onClick={() => navto("checkout")}
                  className="w-full py-3.5 text-[12px] font-bolder uppercase bg-black text-white rounded-md cursor-pointer mt-2 transition-colors hover:bg-red-600 active:bg-red-600"
                >
                  checkout
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartMenu;
