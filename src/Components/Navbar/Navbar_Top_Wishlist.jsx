import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishlist_getProductUserWishlist } from "../../Store/APIS";
import { auth } from "./../../Firebase/Firebase";
import { emptyWishlistProducts } from "../../Store/ProductsSlice";
import { toggleWishlistState } from "../../Store/PortalSlice";
import { useLocation } from "react-router-dom";

const Navbar_Top_Wishlist = () => {
  const { wishlistProducts, wishlistState } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);

  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  const action = useDispatch();

  const isAccountPage = useLocation().pathname.includes("my-account");

  useEffect(() => {
    auth.currentUser
      ? action(wishlist_getProductUserWishlist())
      : action(emptyWishlistProducts());
  }, [
    auth.currentUser,
    userData?.email_address,
    wishlistState.productsLength,
    wishlistState.message,
    loadingState.state,
  ]);

  return (
    <div
      className={`relative ${
        !isAccountPage &&
        "hover:text-red-600 active:text-red-600 cursor-pointer transition-colors"
      } hidden sm:block`}
      onClick={() => !isAccountPage && action(toggleWishlistState(true))}
    >
      <FontAwesomeIcon icon="fa-regular fa-heart" size="xl" />
      <span className="absolute -right-3 -top-3 text-white bg-red-600 rounded-full w-[17px] h-[17px] leading-[17px] text-[10px] text-center">
        {Object.keys(wishlistProducts).length}
      </span>
    </div>
  );
};

export default Navbar_Top_Wishlist;
