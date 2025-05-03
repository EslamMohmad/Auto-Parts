import { useState } from "react";

const Payment_Method = () => {
  const methodsArray = [
    {
      type: "direct bank transfer",
      text: "make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
      name: "direct_bank_transfer",
      state: true,
    },
    {
      type: "check payments",
      text: "please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
      name: "check_payments",
      state: false,
    },
    {
      type: "cash on delivery",
      text: "pay with cash upon delivery.",
      name: "cash_on_delivery",
      state: false,
    },
  ];

  const [methods, setMethods] = useState(methodsArray);

  return (
    <div className="flex flex-col gap-5 py-5 border-y border-y-black/20 my-5">
      {methods.map((method) => (
        <div key={method.type} className="flex">
          <input
            label={method.type}
            form="billing-opration"
            className="mr-3 accent-black h-fit mt-1.5 "
            type="radio"
            id={method.name}
            name="payment-options"
            checked={
              method.type === methods.filter((object) => object.state)[0].type
            }
            onChange={() =>
              setMethods((prev) =>
                prev.map((object) =>
                  object.type === method.type
                    ? { ...object, state: true }
                    : { ...object, state: false }
                )
              )
            }
          />
          <div className="overflow-hidden">
            <label className="capitalize cursor-pointer" htmlFor={method.name}>
              {method.type}
            </label>
            <p
              className={`text-black/60 text-xs mt-2 ${
                method.state ? "h-[50px]" : "h-0"
              } transition-all`}
            >
              {method.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payment_Method;
