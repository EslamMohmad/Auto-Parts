import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishlist_getProductUserWhishlist } from "../../Store/APIS";
import { auth } from "./../../Firebase/Firebase";
import { emptyWishlistProducts } from "../../Store/ProductsSlice";

const Navbar_Top_Wishlist = () => {
  const { wishlistProducts, wishlistState } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);

  const action = useDispatch();

  useEffect(() => {
    auth.currentUser
      ? action(wishlist_getProductUserWhishlist())
      : action(emptyWishlistProducts());
  }, [
    auth.currentUser,
    userData?.email_address,
    wishlistState.productsLength,
    wishlistState.message,
  ]);

  return (
    <div className="relative hover:text-red-600 active:text-red-600 cursor-pointer transition-colors hidden sm:block">
      <FontAwesomeIcon icon="fa-regular fa-heart" size="xl" />
      <span className="absolute -right-3 -top-3 text-white bg-red-600 rounded-full w-[17px] h-[17px] leading-[17px] text-[10px] text-center">
        {Object.keys(wishlistProducts).length}
      </span>
    </div>
  );
};

export default Navbar_Top_Wishlist;
