import { useState } from "react";
import Billing_Details from "../Components/Checkout/Billing_Details";
import Your_Order from "../Components/Checkout/Your_Order";

const Checkout = () => {
  const [validForm, setValidForm] = useState(false);

  const formHandler = (e) => {
    const requiredInputs = [...e.target.form.elements].filter(
      (input) => input.required
    );

    setValidForm(() =>
      requiredInputs.every((input) =>
        input.type === "checkbox" ? input.checked : input.value
      )
    );
  };

  return (
    <section>
      <form
        className="py-10 flex flex-col lg:flex-row gap-8"
        id="billing-opration"
        name="billing-opration"
        onSubmit={(e) => e.preventDefault()}
        onChange={formHandler}
      >
        <div className="lg:w-[70%]">
          <Billing_Details />
        </div>
        <Your_Order validForm={validForm} />
      </form>
    </section>
  );
};

export default Checkout;
