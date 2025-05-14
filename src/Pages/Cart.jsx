import { useDispatch, useSelector } from "react-redux";
import ProductsCartTable from "../Components/Cart/ProductsCartTable";
import ProductsComponent from "./../ReuseableComponents/ProductsComponent";
import { useEffect } from "react";
import { shop_getProducts } from "../Store/APIS";
import Process_Button from "../ReuseableComponents/Process_Button";
import Shipping_Orders from "../ReuseableComponents/Shipping_Orders";
import useNavToHome from "../Hooks/useNavToHome";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { shopPageProducts, loadingState } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const { products } = useSelector(({ CartSlice }) => CartSlice);

  const action = useDispatch();

  const navTo = useNavigate();

  useEffect(() => {
    if (!shopPageProducts.length) {
      action(shop_getProducts(""));
    }
  }, [shopPageProducts.length]);

  useNavToHome(products);

  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-7 py-10">
        <div className="lg:w-[65%]">
          <ProductsCartTable />
          <ProductsComponent
            heading="you may also like"
            products={shopPageProducts.slice(0, 10)}
            loadingState={false}
            firstBtnIcon={false}
          />
        </div>
        <div className="md:sticky top-[110px] lg:grow border border-black/10 rounded-lg h-fit">
          <h1 className="uppercase py-5 text-lg text-center font-bold">
            cart totals
          </h1>
          <div className="p-6 bg-black/10 rounded-lg">
            <Shipping_Orders />
            <Process_Button
              clickable={true}
              outermethod={() => navTo("../checkout")}
              methodname="process to checkout"
              className="bg-black text-white h-[60px] leading-[60px] w-full uppercase rounded-md hover:bg-red-500 active:bg-red-500 mt-4 text-sm font-semibold cursor-pointer text-center"
            >
              process to checkout
            </Process_Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
