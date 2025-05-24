import { useEffect, useState } from "react";
import Billing_Details from "../Components/Checkout/Billing_Details";
import Your_Order from "../Components/Checkout/Your_Order";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Firebase/Firebase";
import { toggleAuthState } from "../Store/PortalSlice";

const Checkout = () => {
  const { products } = useSelector(({ CartSlice }) => CartSlice);

  const [validForm, setValidForm] = useState(false);

  const { pathname } = useLocation();

  const action = useDispatch();

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

  const navTo = useNavigate();

  useEffect(() => {
    if (!products.length) {
      navTo("../");
    }
  }, [products.length]);

  useEffect(() => {
    pathname.includes("checkout") &&
      !auth.currentUser &&
      action(toggleAuthState(true));
  }, [pathname, auth.currentUser]);

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
