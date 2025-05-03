import { useDispatch, useSelector } from "react-redux";
import { totalPrice } from "../Utils/Function";
import { setShippingType } from "../Store/CartSlice";

const Shipping_Input = ({ shipping, shippingType }) => {
  const action = useDispatch();

  return (
    <div>
      <input
        className="mr-3 accent-black"
        type="radio"
        id={shipping.type}
        name="shipping-options"
        checked={shipping.type === shippingType.filter((e) => e.state)[0].type}
        onChange={() => action(setShippingType({ ...shipping }))}
      />
      <label
        className="capitalize text-black/60 text-[13px]"
        htmlFor={shipping.type}
      >
        {shipping.type} : ${shipping.price}.00
      </label>
    </div>
  );
};

const Shipping_Orders = () => {
  const { products, shippingType } = useSelector(({ CartSlice }) => CartSlice);

  return (
    <>
      <div className=" flex flex-col gap-5 pb-8">
        <h4 className="text-center font-bold text-[14px]">shipping</h4>
        {shippingType.map((shipping) => (
          <Shipping_Input
            key={shipping.type}
            shipping={shipping}
            shippingType={shippingType}
          />
        ))}

        <p className="text-sm text-black/60 text-c">
          shipping options will be updated during checkout.
        </p>
      </div>
      <div className="flex justify-between items-center mt-5">
        <span className="text-black/60 uppercase">total</span>
        <h1 className="text-xl font-bold">
          $
          {(
            totalPrice(products) +
            shippingType.filter((shipping) => shipping.state)[0].price
          ).toFixed(2)}
        </h1>
      </div>
    </>
  );
};

export default Shipping_Orders;
