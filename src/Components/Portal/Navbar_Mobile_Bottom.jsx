import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleAuthState, toggleWishlistState } from "../../Store/PortalSlice";

const Navbar_Mobile_Bottom = () => {
  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);
  const { wishlistProducts } = useSelector(
    ({ ProductsSlice }) => ProductsSlice
  );

  const navTo = useNavigate();

  const action = useDispatch();

  const isAccountPage = useLocation().pathname.includes("my-account");

  const navigation = [
    { name: "home", icon: "fa-solid fa-house", method: () => navTo("") },
    { name: "shopping", icon: "fa-solid fa-shop", method: () => navTo("shop") },
    {
      name: "wishlist",
      icon: "fa-solid fa-heart",
      method: () =>
        userData?.email_address
          ? !isAccountPage && action(toggleWishlistState(true))
          : action(toggleAuthState(true)),
    },
    {
      name: userData?.email_address ? userData?.displayName : "account",
      icon: "fa-solid fa-user",
      method: () =>
        userData?.email_address
          ? navTo("my-account")
          : action(toggleAuthState(true)),
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full shadow-top transition-none bg-white z-[1]">
      <ul className="flex items-center">
        {navigation.map(({ name, method, icon }) => (
          <li
            key={name}
            className="w-1/4 border-r not-last-of-type:border-r border-gray-200 group"
          >
            <div
              onClick={() => method()}
              className="relative py-3 flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon
                size={name === "wishlist" ? "xl" : "md"}
                icon={icon}
                className="group-hover:text-red-500"
              />
              {name === "wishlist" && (
                <span className="text-[9px] absolute left-1/2 -translate-x-1/2 top-3.5 w-[18px] h-[18px] leading-[18px] rounded-full text-center text-white">
                  {Object.values(wishlistProducts).length}
                </span>
              )}
              <span className="text-[10px] text-gray-600 mt-2 overflow-hidden text-ellipsis whitespace-nowrap w-[70px] text-center">
                {name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar_Mobile_Bottom;
