import { useDispatch, useSelector } from "react-redux";
import { monthsArray, totalPrice } from "../../Utils/Function";
import Shipping_Orders from "./../../ReuseableComponents/Shipping_Orders";
import Payment_Method from "./Payment_Method";
import { checkout_createOrder } from "../../Store/APIS";
import Process_Button from "../../ReuseableComponents/Process_Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Your_Order = ({ validForm }) => {
  const { products, shippingType, paymentType, couponCode } = useSelector(
    ({ CartSlice }) => CartSlice
  );

  const action = useDispatch();

  const formRef = useRef();

  const navTo = useNavigate();

  const billingOrderHandler = (e) => {
    const {
      first_name,
      last_name,
      company_name,
      street_address,
      postcode,
      town,
      phone,
      email_address,
      order_notes,
      coupon_code,
    } = e.form;

    const total =
      "$" +
        (
          products
            .map(
              (product) => product.size.price.replace("$", "") * product.amount
            )
            ?.reduce((prev, curr) => prev + curr) +
          shippingType.find((shipping) => shipping.state).price
        )?.toFixed(2) || 0;

    const orderDate = new Date();

    const customer = {
      name: email_address.value.slice(
        -email_address.value.length,
        email_address.value.indexOf("@")
      ),
      details: {
        first_name: first_name.value,
        last_name: last_name.value,
        company_name: company_name.value,
        street_address: street_address.value,
        postcode: postcode.value,
        town: town.value,
        phone: phone.value,
        email_address: email_address.value,
        order_notes: order_notes.value,
        order_date: `${
          monthsArray[orderDate.getMonth()]
        } ${orderDate.getDate()},${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}`,
        products,
        payment_method: paymentType.find((payment) => payment.state).type,
        subtotal: total,
        coupon_code: couponCode || coupon_code.value,
        order_number: (Math.random() * 4000).toFixed(),
        shipping: shippingType.find((shipping) => shipping.state),
      },
    };

    action(checkout_createOrder(customer));
  };

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
              <h3 className="w-[65%] sm:w-[80%] flex gap-3 items-center">
                <p className="text-ellipsis whitespace-nowrap overflow-hidden w-[90%]">
                  {product.heading}
                </p>
                <span className="text-xs font-bold text-black whitespace-nowrap">
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
            />
            <label
              htmlFor="agree-terms"
              className="ml-3 text-sm !font-extralight first-letter:capitalize select-none "
            >
              i have read and agree to the website terms and conditions *
            </label>
          </div>
        </div>
        <Process_Button
          ref={formRef}
          type="submit"
          clickable={validForm}
          outermethod={() => (
            billingOrderHandler(formRef.current), navTo("../orders")
          )}
          className="bg-black text-white h-[60px] leading-[60px] w-full uppercase rounded-md hover:bg-red-500 active:bg-red-500 mt-4 text-sm font-semibold cursor-pointer text-center relative"
        >
          place order
        </Process_Button>
      </div>
    </div>
  );
};

export default Your_Order;
