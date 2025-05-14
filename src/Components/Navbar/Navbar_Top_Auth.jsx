import { useDispatch, useSelector } from "react-redux";
import { toggleAuthState } from "../../Store/PortalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getUserData, toggleAccountOptions } from "../../Store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { auth_logoutAccount } from "../../Store/APIS";
import { auth } from "../../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar_Top_Auth = () => {
  const { userData, accountOptionsState } = useSelector(
    ({ AuthSlice }) => AuthSlice
  );

  const action = useDispatch();

  const navTo = useNavigate();

  const accountOptions = [
    { name: "my account", method: () => navTo("my-account") },
    {
      name: "order tracking",
      method: () => navTo("my-account/order-tracking"),
    },
    { name: "my cart", method: () => navTo("my-account/my-cart") },
    { name: "checkout", method: () => navTo("my-account/checkout") },
    { name: "wishlist", method: () => navTo("my-account/wishlist") },
    { name: "logout", method: () => action(auth_logoutAccount()) },
  ];

  useEffect(() => {
    if (accountOptionsState) {
      document.body.addEventListener("click", function () {
        action(toggleAccountOptions(false));
      });
    }
  }, [accountOptionsState]);

  useEffect(() => {
    !userData?.email &&
      onAuthStateChanged(auth, (user) => {
        action(getUserData(user?.email));
      });
  }, [auth.currentUser]);

  return (
    <button
      className="relative items-center gap-2 hidden sm:flex group cursor-pointer"
      onClick={(e) => (
        e.stopPropagation(),
        userData?.email
          ? action(toggleAccountOptions(!accountOptionsState))
          : action(toggleAuthState(true))
      )}
    >
      <FontAwesomeIcon
        icon="fa-regular fa-user"
        className="group-hover:text-red-600 active:text-red-600 duration-300 transition-colors cursor-pointer text-[25px]"
        {...(userData?.email ? null : { title: "sign up" })}
      />
      {userData?.email && (
        <div>
          <h1 className="font-bold leading-5">account</h1>
          <p className="text-[10px] font-light capitalize text-ellipsis overflow-hidden whitespace-nowrap w-[65px]">
            hello, {userData?.displayName}
          </p>
        </div>
      )}
      <AnimatePresence>
        {accountOptionsState && (
          <motion.ul
            initial={{ opacity: 0, top: "200%" }}
            animate={{ opacity: 1, top: "160%" }}
            exit={{ opacity: 0, top: "200%" }}
            className="absolute bg-white px-5 rounded-md border border-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            {accountOptions.map((option) => (
              <li
                key={option.name}
                className="text-black/70 text-[13px] px-4 py-3 pl-0 text-left whitespace-nowrap not-last-of-type:border-b hover:text-red-500 border-b-black/10"
                onClick={() => (
                  option.method(), action(toggleAccountOptions(false))
                )}
              >
                {option.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </button>
  );
};

export default Navbar_Top_Auth;
