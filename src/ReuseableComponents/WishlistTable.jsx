import { useSelector } from "react-redux";
import Process_Button from "./Process_Button";
import { addProductToCart } from "../Store/CartSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleCartMenu } from "../Store/PortalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button_Title from "./Button_Title";
import { wishlist_removeProductFromUserWishlist } from "../Store/APIS";

const WishlistTable = () => {
  const { wishlistProducts } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const navTo = useNavigate();

  const { pathname } = useLocation();

  const productType = (product) => {
    return product.size.value ? true : false;
  };

  return (
    <div className="flex flex-col gap-5">
      {Object.keys(wishlistProducts).length ? (
        Object.values(wishlistProducts).map((product) => (
          <div
            className="flex flex-col  text-center sm:flex-row items-center gap-4 py-6 my-3 sm:my-0 sm:p-4 border border-black/10 rounded-md text-sm text-black/60 hover:shadow-bottom transition-shadow"
            key={product.heading}
          >
            <Process_Button
              clickable={true}
              methodname="delete-wishlist-product"
              afterloading={[wishlist_removeProductFromUserWishlist(product)]}
              className="relative group cursor-pointer w-[30px] h-[30px] leading-[30px] text-center bg-black text-white hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white transition-colors rounded-full"
            >
              <FontAwesomeIcon icon="fa-regular fa-trash-can" size="sm" />
              <Button_Title title="delete" />
            </Process_Button>
            <img
              loading="lazy"
              src={product.imgs[0]}
              className="h-[200px] sm:h-[90px]"
            />
            <div className="flex flex-col gap-3">
              <Link
                to={`/Auto-Parts/shop/${product.categorie[0]}/${product.heading}`}
                className="sm:w-[200px] sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis hover:text-red-600 active:text-red-600 transition-colors"
              >
                {product.heading}
              </Link>
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
                      addProductToCart({ ...product, amount: 1 }),
                      toggleCartMenu(true),
                    ],
                  })}
              className={`cursor-pointer sm:ml-auto rounded-full bg-black text-white hover:bg-red-600 transition-colors group relative ${
                pathname.includes("my-account")
                  ? "w-[200px] py-4"
                  : "w-[40px] h-[40px] leading-[40px]"
              }`}
            >
              {product.size.value ? (
                pathname.includes("my-account") ? (
                  <span>select options</span>
                ) : (
                  <>
                    <FontAwesomeIcon icon="fa-solid fa-check" size="md" />
                    <Button_Title title="select options" />
                  </>
                )
              ) : pathname.includes("my-account") ? (
                <span>add to cart</span>
              ) : (
                <>
                  <FontAwesomeIcon icon="fa-solid fa-truck-fast" size="md" />
                  <Button_Title title="add to cart" />
                </>
              )}
            </Process_Button>
          </div>
        ))
      ) : (
        <h1 className="p-7 text-center">no products to show</h1>
      )}
    </div>
  );
};

export default WishlistTable;
