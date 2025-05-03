import { useDispatch, useSelector } from "react-redux";
import Checkout_Form_Input from "../../ReuseableComponents/Checkout_Form_Input";
import { checkout_createOrder } from "../../Store/APIS";

const Billing_Details = () => {
  const { products, shippingType } = useSelector(({ CartSlice }) => CartSlice);

  const action = useDispatch();

  const formInputs = [
    {
      name: "first name",
      element: (
        <Checkout_Form_Input
          name="first_name"
          inputType="text"
          label="first name"
          required
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
        />
      ),
    },
  ];

  const billingOrderHandler = (e) => {
    e.preventDefault();

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
      direct_bank_transfer,
      check_payments,
      cash_on_delivery,
    } = e.target;

    const paymentMethod = [
      direct_bank_transfer,
      check_payments,
      cash_on_delivery,
    ].filter((e) => e.checked)[0].labels[0].textContent;

    const total =
      "$" +
        (
          products
            .map(
              (product) => product.size.price.replace("$", "") * product.amount
            )
            ?.reduce((prev, curr) => prev + curr) +
          shippingType.filter((shipping) => shipping.state)[0].price
        )?.toFixed(2) || 0;

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
        products,
        payment_method: paymentMethod,
        subtotal: total,
      },
    };

    action(checkout_createOrder(customer));
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center uppercase py-6 border-b-2">
        biling details
      </h1>
      <form
        className="flex flex-col"
        onSubmit={billingOrderHandler}
        id="billing-opration"
      >
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
      </form>
    </div>
  );
};

export default Billing_Details;
