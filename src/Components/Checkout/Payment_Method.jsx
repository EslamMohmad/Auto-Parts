import { useDispatch, useSelector } from "react-redux";
import { setPaymentType } from "../../Store/CartSlice";

const Payment_Method = () => {
  const { paymentType } = useSelector(({ CartSlice }) => CartSlice);

  const action = useDispatch();

  const methodsArray = {
    "direct bank transfer":
      "make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
    "check payments":
      "please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
    "cash on delivery": "pay with cash upon delivery.",
  };

  return (
    <div className="flex flex-col gap-5 py-5 border-y border-y-black/20 my-5">
      {paymentType.map((method) => (
        <div key={method.type} className="flex">
          <input
            label={method.type}
            className="mr-3 accent-black h-fit mt-1.5 "
            type="radio"
            id={method.type}
            name="payment-options"
            checked={
              method.type ===
              paymentType.filter((object) => object.state)[0].type
            }
            onChange={() => action(setPaymentType(method))}
          />
          <div className="overflow-hidden">
            <label className="capitalize cursor-pointer" htmlFor={method.type}>
              {method.type}
            </label>
            <p
              className={`text-black/60 text-xs mt-2 ${
                method.state ? "h-[50px]" : "h-0"
              } transition-all`}
            >
              {methodsArray[method.type]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payment_Method;
