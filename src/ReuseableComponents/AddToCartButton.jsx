import { useDispatch, useSelector } from "react-redux";
import Process_Button from "./Process_Button";
import { toggleCartMenu } from "../Store/PortalSlice";
import { addProductToCart } from "../Store/CartSlice";

const AddToCartButton = ({ size, product, amount }) => {
  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  const action = useDispatch();

  const addProductToCartHandler = () => {
    const productInfo = {
      ...product,
      size: product?.size.value ? size : { ...product?.size },
      amount: amount,
    };
    action(addProductToCart(productInfo));
  };

  return (
    <Process_Button
      className={`whitespace-nowrap border py-3 px-5 rounded-3xl uppercase text-sm grow text-center ${
        size.value || !product?.size?.value
          ? `cursor-pointer hover:bg-red-500 ${
              loadingState.state && loadingState.method === "add to cart"
                ? "bg-red-500 border-transparent"
                : ""
            } active:bg-red-500 hover:text-white active:text-white transition-colors hover:border-transparent active:border-transparent`
          : "cursor-not-allowed"
      }`}
      disabled={!size.value && product?.size?.value}
      methodname="add to cart"
      afterloading={[toggleCartMenu(true)]}
      clickable={size.value || !product?.size?.value}
      outermethod={addProductToCartHandler}
    >
      add to cart
    </Process_Button>
  );
};

export default AddToCartButton;
