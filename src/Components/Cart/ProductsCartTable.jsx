import { useSelector } from "react-redux";
import { ProductAmount } from "../Portal/ProductQuickView";
import { useRef } from "react";
import Process_Button from "../../ReuseableComponents/Process_Button";

const ProductRowTable = ({ product }) => {
  const productAmountRef = useRef();

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
        <ProductAmount ref={productAmountRef} productAmount={product.amount} />
      </td>
      <td className="text-center">
        ${+product.size.price.replace("$", "") * product?.amount}.00
      </td>
    </tr>
  );
};

const ProductsCartTable = () => {
  const { products } = useSelector(({ CartSlice }) => CartSlice);

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
                <ProductRowTable key={product.heading} product={product} />
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
            type="text"
            placeholder="coupon code"
            className="border-dashed border border-black/30 focus:border-black transition-all outline-none py-4.5 px-7   rounded-md w-1/2 sm:w-auto"
          />
          <Process_Button
            clickable={true}
            methodname="apply coupon"
            className="bg-black text-white hover:bg-red-600 px-7 uppercase font-semibold text-sm rounded-md cursor-pointer transition-colors w-1/2 sm:w-auto sm:min-w-[158px] h-[60px] leading-[60px]"
          >
            apply coupon
          </Process_Button>
        </div>
        <div className="my-auto">
          <Process_Button
            clickable={true}
            methodname="update cart"
            className="whitespace-nowrap bg-black/10 hover:bg-black hover:text-white sm:min-w-[158px] h-[60px] leading-[60px] px-7 uppercase font-semibold text-sm rounded-md cursor-pointer transition-colors text-center"
          >
            update cart
          </Process_Button>
        </div>
      </div>
    </>
  );
};

export default ProductsCartTable;
