import Billing_Details from "../Components/Checkout/Billing_Details";
import Your_Order from "../Components/Checkout/Your_Order";

const Checkout = () => {
  return (
    <section>
      <div className="py-10 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[70%]">
          <Billing_Details />
        </div>
        <Your_Order />
      </div>
    </section>
  );
};

export default Checkout;
