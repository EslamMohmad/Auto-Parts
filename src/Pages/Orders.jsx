import { useSelector } from "react-redux";
import OrdersTypes from "../Components/Orders/OrdersTypes";
import OrdersTable from "../Components/Orders/OrdersTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Orders = () => {
  const { currentOrders } = useSelector(({ CartSlice }) => CartSlice);

  const {
    order_date,
    order_number,
    subtotal,
    payment_method,
    products,
    shipping,
  } = currentOrders?.details;

  return (
    <section>
      <div className="py-10">
        <div className="mx-auto w-fit my-5">
          <FontAwesomeIcon
            icon="fa-regular fa-circle-check"
            color="green"
            className="text-6xl sm:text-9xl"
          />
        </div>
        <h1 className="text-lg sm:text-2xl font-bold text-center text-black/70 my-7">
          thank you, your order has been recevied
        </h1>
        <OrdersTypes
          details={{ order_date, order_number, subtotal, payment_method }}
        />
        <OrdersTable
          details={{ subtotal, payment_method, products, shipping }}
        />
      </div>
    </section>
  );
};

export default Orders;
