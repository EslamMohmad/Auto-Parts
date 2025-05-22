import OrdersTable from "../../ReuseableComponents/OrdersTable";

const Order = ({ data }) => {
  const { subtotal, payment_method, shipping } = data?.details;

  return (
    <OrdersTable
      details={{
        subtotal,
        payment_method,
        products: data.products,
        shipping,
      }}
    />
  );
};

export default Order;
