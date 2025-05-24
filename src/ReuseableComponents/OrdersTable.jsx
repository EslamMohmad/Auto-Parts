import { totalPrice } from "../Utils/Function";

export const OrdersTable = ({ details }) => {
  const ordersDetails = {
    subtotal: "$" + totalPrice(details?.products).toFixed(2),
    shipping: `$${details?.shipping?.price.toFixed(2)} via ${
      details?.shipping?.type
    }`,
    "payment method": details?.payment_method,
    total: details?.subtotal,
  };

  return (
    <table className="w-full text-sm text-left rounded-lg">
      <thead className="bg-black/10">
        <tr>
          <th className="px-6 py-5">Product</th>
          <th className="px-6 py-5 text-right">total</th>
        </tr>
      </thead>
      <tbody className="text-black/50">
        {details?.products?.map((product) => (
          <tr key={product?.id}>
            <td className="px-6 py-5">{product?.heading}</td>
            <td className="px-6 py-5 text-right">{product?.size?.price}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        {Object.keys(ordersDetails).map((key) => (
          <tr key={key}>
            <th className="py-5 px-6 text-black">{key}</th>
            <th className="py-5 px-6 text-black text-right">
              {ordersDetails[key]}
            </th>
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default OrdersTable;
