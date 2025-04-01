import { AnimatePresence, motion } from "framer-motion";
import { toggleCartMenu } from "../../Store/PortalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Navbar_Top_Cart from "../Navbar/Navbar_Top_Cart";
import cart from "../../Assets/Portal/Cart_Menu/icon-cart.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button_Title from "../../ReuseableComponents/Button_Title.jsx";
import { removeProductFromCart } from "../../Store/CartSlice.js";

const RowProduct = ({ details }) => {
  const { id, img, heading, amount, price } = details;

  const action = useDispatch();

  return (
    <div className="flex justify-between items-center border border-black/15 rounded-md p-1 pr-2.5 hover:shadow-bottom transition-shadow relative">
      <img src={img} className="w-[30%]" />
      <div className="relative max-w-[115px]">
        <h1 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap hover:text-red-500 active:text-red-500 transition-colors cursor-pointer select-none">
          {heading}
        </h1>
        <p className="text-[13px] my-1">
          <span className="text-gray-400 mr-2">{amount} </span> x
          <span className="ml-2">{price}</span>
        </p>
      </div>
      <button
        className="relative group cursor-pointer w-[30px] h-[30px] leading-[30px] text-center hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white transition-colors rounded-full"
        onClick={() => action(removeProductFromCart(id))}
      >
        <FontAwesomeIcon icon="fa-regular fa-trash-can" size="sm" />
        <Button_Title title="delete" />
      </button>
    </div>
  );
};

const CartMenu = () => {
  const { cartMenuState } = useSelector(({ PortalSlice }) => PortalSlice);
  const { products } = useSelector(({ CartSlice }) => CartSlice);

  const action = useDispatch();

  const totalPrice = () => {
    let count = 0;
    products.map(
      (product) =>
        (count += +product.amount * +product.size.price.replace(/\$/g, ""))
    );
    return count;
  };

  return (
    <AnimatePresence>
      {cartMenuState && (
        <motion.div
          className="absolute w-[80%] sm:w-[350px] h-full z-20 sm:z-10 bg-white pt-10 px-4 flex flex-col gap-16"
          initial={{ right: "-100%" }}
          animate={{ right: 0 }}
          exit={{ right: "-100%", transition: { duration: 1 } }}
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
                <button className="uppercase py-4 px-10 rounded-4xl bg-gray-200 text-[11px] font-bold cursor-pointer hover:bg-red-500 active:bg-red-500 transition-colors hover:text-white active:text-white">
                  continue shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 grow overflow-auto p-1 [&::-webkit-scrollbar]:!w-1.5 pr-3 border-t border-b py-5 border-black/10 rounded-md ">
                {products.map((product, index) => {
                  const details = {
                    id: product.id,
                    img: product.imgs[
                      Math.round(Math.random() * product.imgs.length)
                    ],
                    heading: product.heading,
                    amount: product.amount,
                    price: product.size.price,
                  };
                  return (
                    <RowProduct
                      key={product.amount + "000" + index}
                      details={details}
                    />
                  );
                })}
              </div>
              <div className="bg-gray-200 p-4 mt-auto -mx-4">
                <div className="uppercase flex justify-between items-center text-[13px] my-2">
                  subtotal{" "}
                  <span className="font-bold">${totalPrice().toFixed(2)}</span>
                </div>
                <button className="w-full py-3.5 text-[12px] font-bolder uppercase bg-white border rounded-md cursor-pointer border-black/20 transition-colors hover:bg-black active:bg-black hover:text-white active:text-white">
                  view cart
                </button>
                <button className="w-full py-3.5 text-[12px] font-bolder uppercase bg-black text-white rounded-md cursor-pointer mt-2 transition-colors hover:bg-red-500 active:bg-red-500">
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
