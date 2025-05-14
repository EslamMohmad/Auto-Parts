import { totalPrice } from "../../Utils/Function";

const OrdersTable = ({ details }) => {
  const { products, payment_method, subtotal: total, shipping } = details;

  const ordersDetails = {
    subtotal: "$" + totalPrice(products).toFixed(2),
    shipping: `$${shipping.price.toFixed(2)} via ${shipping.type}`,
    "payment method": payment_method,
    total,
  };

  return (
    <div className="py-7">
      <table className="w-full text-sm text-left rounded-lg">
        <thead className="bg-black/10">
          <tr>
            <th scope="col" className="px-6 py-5">
              Product
            </th>
            <th scope="col" className="px-6 py-5 text-right">
              total
            </th>
          </tr>
        </thead>
        <tbody className="text-black/50">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-5">{product.heading}</td>
              <td className="px-6 py-5 text-right">{product.size.price}</td>
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
    </div>
  );
};

export default OrdersTable;
