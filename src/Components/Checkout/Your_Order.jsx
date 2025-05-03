import { useSelector } from "react-redux";
import { totalPrice } from "../../Utils/Function";
import Shipping_Orders from "./../../ReuseableComponents/Shipping_Orders";
import Payment_Method from "./Payment_Method";

const Your_Order = () => {
  const { products } = useSelector(({ CartSlice }) => CartSlice);

  return (
    <div className="md:sticky top-[110px] lg:w-[45%] border border-black/10 rounded-lg h-fit">
      <h1 className="uppercase py-5 text-lg text-center font-bold">
        your order
      </h1>
      <div className="p-6 bg-black/10 rounded-lg">
        <div className="flex flex-col mb-10">
          <div className="flex justify-between items-center py-5 border-b border-b-black/20">
            <span className="text-sm font-semibold">product</span>
            <span className="text-sm font-semibold">subtotal</span>
          </div>
          {products.map((product) => (
            <div
              key={product.heading}
              className="flex items-center justify-between text-black/50 text-sm border-b border-b-black/20 py-5"
            >
              <h3 className="w-[80%] flex gap-3 items-center">
                <p className="text-ellipsis whitespace-nowrap overflow-hidden w-[90%]">
                  {product.heading}
                </p>
                <span className="text-xs font-bold text-black">
                  x {product.amount}
                </span>
              </h3>
              <span>
                ${product.size.price.replace("$", "") * product.amount}.00
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center py-5  ">
            <span className="text-sm font-semibold">subtotal</span>
            <span className="text-sm font-semibold">
              ${totalPrice(products).toFixed(2)}
            </span>
          </div>
        </div>
        <Shipping_Orders />
        <Payment_Method />
        <div>
          <p className="text-black/60 text-sm">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>
          <div className="mt-4">
            <input
              type="checkbox"
              id="agree-terms"
              className="accent-black w-[15px] h-[15px]"
              required
              form="billing-opration"
            />
            <label
              htmlFor="agree-terms"
              className="ml-3 text-sm !font-extralight first-letter:capitalize select-none "
            >
              i have read and agree to the website terms and conditions *
            </label>
          </div>
        </div>
        <button
          form="billing-opration"
          className="bg-black text-white h-[60px] leading-[60px] w-full uppercase rounded-md hover:bg-red-500 active:bg-red-500 mt-4 text-sm font-semibold cursor-pointer text-center relative"
        >
          place order
        </button>
      </div>
    </div>
  );
};

export default Your_Order;
