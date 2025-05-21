import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Process_Button from "../../ReuseableComponents/Process_Button";
import { setCouponCode, updateProductAmount } from "../../Store/CartSlice";
import ProductAmount from "../../ReuseableComponents/ProductAmount";

const ProductRowTable = ({ product, updateCartHanlder }) => {
  const [amount, setAmount] = useState(product.amount || 1);

  useEffect(() => {
    updateCartHanlder(product, amount);
  }, [amount]);

  return (
    <tr className="border-b border-b-black/10">
      <th className="flex gap-3 items-center">
        <img src={product.imgs[0]} className="w-[150px]" />
        <p className="w-[50%] text-ellipsis overflow-hidden whitespace-nowrap">
          {product.heading}
        </p>
      </th>
      <td className="text-center">{product.price.after}</td>
      <td className="text-center">
        <ProductAmount setAmount={setAmount} amount={amount} />
      </td>
      <td className="text-center">
        ${+product.size.price.replace("$", "") * amount || product?.amount}.00
      </td>
    </tr>
  );
};

const ProductsCartTable = () => {
  const { products, couponCode } = useSelector(({ CartSlice }) => CartSlice);
  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  const [coupon, setCoupon] = useState("");

  const [updateProduct, setUpdateProduct] = useState([]);

  const action = useDispatch();

  const updateCartHanlder = (product, amount) => {
    const productExist = updateProduct.find((e) => e.id === product.id);

    if (!productExist) {
      setUpdateProduct([...updateProduct, { ...product, amount }]);
    } else {
      setUpdateProduct(() =>
        updateProduct.map((e) => (e.id === product.id ? { ...e, amount } : e))
      );
    }
  };

  const changesState = () => {
    return !updateProduct
      .map((e, i) => e?.amount === products[i].amount)
      .every((state) => state);
  };

  useEffect(() => {
    couponCode && setCoupon("");
  }, [couponCode]);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left  text-black/60 rounded-lg">
          <thead className="text-black/60 uppercase bg-black/10">
            <tr>
              <th scope="col" className="px-6 py-5 text-center">
                Product
              </th>
              <th scope="col" className="px-6 py-5">
                price
              </th>
              <th scope="col" className="px-6 py-5">
                quantity
              </th>
              <th scope="col" className="px-6 py-5">
                subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products?.map((product) => (
                <ProductRowTable
                  key={product.heading}
                  product={product}
                  updateCartHanlder={updateCartHanlder}
                />
              ))
            ) : (
              <tr className="text-center py-3 w-full" key="no date">
                <td>no products</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-5 justify-between my-10">
        <div className="w-full sm:w-fit flex  sm:items-center gap-2">
          <input
            value={coupon}
            type="text"
            placeholder="coupon code"
            className="border-dashed border border-black/30 focus:border-black transition-all outline-none py-4.5 px-7   rounded-md w-1/2 sm:w-auto"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <Process_Button
            clickable={coupon}
            methodname="apply coupon"
            afterloading={[coupon && setCouponCode(coupon)]}
            className={` hover:bg-red-600 px-7 uppercase font-semibold text-sm rounded-md cursor-pointer transition-colors w-1/2 sm:w-auto sm:min-w-[158px] h-[60px] leading-[60px] text-white  ${
              loadingState.method === "apply coupon"
                ? "bg-red-600"
                : "bg-black hover:red-600"
            }`}
          >
            apply coupon
          </Process_Button>
        </div>
        <div className="my-auto">
          <Process_Button
            clickable={changesState()}
            methodname="update cart"
            afterloading={[
              () =>
                changesState() && action(updateProductAmount(updateProduct)),
            ]}
            className={`whitespace-nowrap sm:min-w-[158px] h-[60px] leading-[60px] px-7 uppercase font-semibold text-sm rounded-md cursor-pointer transition-colors text-center ${
              loadingState.method === "update cart"
                ? "bg-black text-white"
                : "bg-black/10 hover:bg-black hover:text-white "
            }`}
          >
            update cart
          </Process_Button>
        </div>
      </div>
    </>
  );
};

export default ProductsCartTable;
