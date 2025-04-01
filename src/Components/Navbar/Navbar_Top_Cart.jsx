import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleCartMenu } from "../../Store/PortalSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Navbar_Top_Cart = () => {
  const { products } = useSelector(({ CartSlice }) => CartSlice);

  const action = useDispatch();

  return (
    <span className="relative hover:text-red-600 active:text-red-600 cursor-pointer transition-colors">
      <FontAwesomeIcon
        icon="fa-solid fa-cart-shopping"
        size="xl"
        onClick={() => action(toggleCartMenu(true))}
      />
      <span className="absolute -right-3 -top-3 text-white bg-red-600 rounded-full w-[17px] h-[17px] leading-[17px] text-[8px] text-center">
        {products.length}
      </span>
    </span>
  );
};

export default Navbar_Top_Cart;
