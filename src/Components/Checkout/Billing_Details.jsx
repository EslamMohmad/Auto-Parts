import { useSelector } from "react-redux";
import Checkout_Form_Input from "../../ReuseableComponents/Checkout_Form_Input";

const Billing_Details = () => {
  const { couponCode } = useSelector(({ CartSlice }) => CartSlice);

  const {
    userData: { first_name, last_name, phone, email_address },
  } = useSelector(({ AuthSlice }) => AuthSlice);

  const formInputs = [
    {
      name: "first name",
      element: (
        <Checkout_Form_Input
          name="first_name"
          inputType="text"
          label="first name"
          required
          value={first_name}
        />
      ),
    },
    {
      name: "last name",
      element: (
        <Checkout_Form_Input
          name="last_name"
          inputType="text"
          label="last name"
          required
          value={last_name}
        />
      ),
    },
    {
      name: "company name (optional)",
      element: (
        <Checkout_Form_Input
          name="company_name"
          inputType="text"
          label="company name (optional)"
        />
      ),
    },
    {
      name: "street address",
      element: (
        <Checkout_Form_Input
          name="street_address"
          inputType="text"
          label="street address"
          required
          placeholder="house number and street number"
        />
      ),
    },
    {
      name: "postcode /ZIP",
      element: (
        <Checkout_Form_Input
          name="postcode"
          inputType="text"
          label="postcode / ZIP (optional)"
        />
      ),
    },
    {
      name: "town / city",
      element: (
        <Checkout_Form_Input
          name="town"
          inputType="text"
          label="town / city"
          required
        />
      ),
    },
    {
      name: "phone",
      element: (
        <Checkout_Form_Input
          name="phone"
          inputType="text"
          label="phone"
          required
          value={phone}
        />
      ),
    },
    {
      name: "coupon code",
      element: (
        <Checkout_Form_Input
          name="coupon_code"
          inputType="text"
          label="coupon code (optional)"
          value={couponCode}
        />
      ),
    },
    {
      name: "email address",
      element: (
        <Checkout_Form_Input
          name="email_address"
          inputType="email"
          label="email address"
          required
          value={email_address}
        />
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-center uppercase py-6 border-b-2">
        biling details
      </h1>
      <div className="flex flex-col">
        {formInputs.map((input) => (
          <div key={input.name}>{input.element}</div>
        ))}
        <div>
          <label
            htmlFor="order_notes"
            className="py-4 block text-center text-xs text-black/60 w-full"
          >
            order notes (optional)
          </label>
          <textarea
            name="order_notes"
            id="order_notes"
            placeholder="notes about your order eg. special notes for delivery"
            className="w-full py-4   px-4 border border-black/10 rounded-md focus:border-black hover:border-black transition-colors outline-none text-sm placeholder:text-black/30 capitalize h-[200px]"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Billing_Details;
