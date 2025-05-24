import { useSelector } from "react-redux";
import Process_Button from "../../ReuseableComponents/Process_Button";
import { addProductToCart } from "../../Store/CartSlice";
import { useNavigate } from "react-router-dom";
import { toggleCartMenu } from "../../Store/PortalSlice";

const Wishlist = () => {
  const { wishlistProducts } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const navTo = useNavigate();

  const productType = (product) => {
    return product.size.value ? true : false;
  };

  return (
    <div className="flex flex-col gap-5 grow">
      {Object.values(wishlistProducts).map((product) => (
        <div
          className="flex flex-col text-center sm:flex-row items-center gap-4 p-4 border border-black/10 rounded-md text-sm text-black/60 hover:shadow-bottom transition-shadow"
          key={product.heading}
        >
          <img
            loading="lazy"
            src={product.imgs[0]}
            className="h-[200px] sm:h-[90px]"
          />
          <div className="flex flex-col gap-3">
            <h4 className="sm:w-[200px] sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis">
              {product.heading}
            </h4>
            <div className="">
              <span>{product.price.before}</span> -{" "}
              <span>{product.price.after}</span>
            </div>
          </div>
          <Process_Button
            clickable={true}
            methodname="wishlist-addproduct"
            {...(productType(product)
              ? {
                  outermethod: () =>
                    navTo(
                      `/Auto-Parts/shop/${product.categorie[0]}/${product.heading}`
                    ),
                }
              : {
                  afterloading: [
                    addProductToCart(product),
                    toggleCartMenu(true),
                  ],
                })}
            className="cursor-pointer sm:ml-auto w-[200px] py-4 px-6 rounded-full bg-black text-white hover:bg-red-600 transition-colors "
          >
            {product.size.value ? "select options" : "add to cart"}
          </Process_Button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
