import { useSelector } from "react-redux";
import OrdersTypes from "../Components/Orders/OrdersTypes";
import OrdersTable from "../Components/Orders/OrdersTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Orders = () => {
  const { currentOrders } = useSelector(({ CartSlice }) => CartSlice);

  const navTo = useNavigate();

  useEffect(() => {
    if (!currentOrders?.email_address) {
      navTo("../");
    }
  }, [currentOrders?.email_address]);

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
          details={{
            order_date: Object.keys(currentOrders?.orders || {})[0],
            order_number: currentOrders?.order_number,
            subtotal: currentOrders?.subtotal,
            payment_method: currentOrders?.payment_method,
          }}
        />
        <OrdersTable
          details={{
            subtotal: currentOrders?.subtotal,
            payment_method: currentOrders?.payment_method,
            products: Object.values(currentOrders?.orders || [])[0],
            shipping: currentOrders?.shipping,
          }}
        />
      </div>
    </section>
  );
};

export default Orders;
