import { useDispatch, useSelector } from "react-redux";
import ProductsCartTable from "../Components/Cart/ProductsCartTable";
import ProductsComponent from "./../ReuseableComponents/ProductsComponent";
import { useEffect } from "react";
import { shop_getProducts } from "../Store/APIS";
import { useNavigate } from "react-router-dom";
import Process_Button from "../ReuseableComponents/Process_Button";

const Cart = () => {
  const { shopPageProducts, loadingState } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const { products } = useSelector(({ CartSlice }) => CartSlice);

  const action = useDispatch();

  const navTo = useNavigate();

  const totalPrice = () => {
    let count = 0;
    products.map(
      (product) =>
        (count += +product.amount * +product.size.price.replace(/\$/g, ""))
    );
    return count;
  };

  useEffect(() => {
    if (!shopPageProducts.length) {
      action(shop_getProducts(""));
    }
  }, [shopPageProducts.length]);

  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-7 py-10">
        <div className="lg:w-[65%]">
          <ProductsCartTable />
          <ProductsComponent
            heading="you may also like"
            products={shopPageProducts.slice(0, 10)}
            loadingState={loadingState}
            firstBtnIcon={false}
          />
        </div>
        <div className="md:sticky top-[80px] lg:grow border border-black/10 rounded-lg h-fit">
          <h1 className="uppercase py-5 text-lg text-center font-bold">
            cart totals
          </h1>
          <div className="p-6 bg-black/10 rounded-lg">
            <div className=" flex flex-col gap-5 border-b border-b-black/15 pb-8">
              <h4 className="text-center font-bold text-[14px]">shipping</h4>
              <div>
                <input
                  className="mr-3 accent-black"
                  type="radio"
                  id="flat-rate"
                  name="cart-opions"
                  defaultChecked
                />
                <label
                  className="capitalize text-black/60 text-[13px]"
                  htmlFor="flat-rate"
                >
                  flat rate : $50.00
                </label>
              </div>
              <div>
                <input
                  className="mr-3 accent-black"
                  type="radio"
                  id="local-pickup"
                  name="cart-opions"
                />
                <label
                  className="capitalize text-black/60 text-[13px]"
                  htmlFor="local-pickup"
                >
                  local pickup : $30.00
                </label>
              </div>
              <p className="text-sm text-black/60 text-c">
                shipping options will be updated during checkout.
              </p>
            </div>
            <div className="flex justify-between items-center mt-5">
              <span className="text-black/60 text-sm">total</span>
              <h1 className="text-xl font-bold">${totalPrice().toFixed(2)}</h1>
            </div>
            <Process_Button
              clickable={true}
              outermethod={() => navTo("../checkout")}
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
