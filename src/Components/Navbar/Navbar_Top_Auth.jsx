import { useDispatch, useSelector } from "react-redux";
import { toggleAuthState } from "../../Store/PortalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { getUserdata } from "../../Store/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar_Top_Auth = () => {
  const [accountOptsState, setAccountOptsState] = useState(false);

  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);

  const action = useDispatch();

  const navTo = useNavigate();

  const signoutUser = () => {
    signOut(auth)
      .then(() => (setAccountOptsState(false), action(getUserdata({}))))
      .catch((error) => console.error(error.message));
  };

  const accountOptions = [
    { name: "my account", method: () => navTo("my-account") },
    {
      name: "order tracking",
      method: () => navTo("my-account/order-tracking"),
    },
    { name: "my cart", method: () => navTo("my-account/my-cart") },
    { name: "checkout", method: () => navTo("my-account/checkout") },
    { name: "wishlist", method: () => navTo("my-account/wishlist") },
    { name: "logout", method: () => signoutUser() },
  ];

  useEffect(() => {
    if (accountOptsState) {
      document.body.addEventListener("click", function () {
        setAccountOptsState(false);
      });
    }
  }, [accountOptsState]);

  return (
    <button
      className="relative items-center gap-2 hidden sm:flex group cursor-pointer"
      onClick={(e) => (
        e.stopPropagation(),
        userData?.email
          ? setAccountOptsState(!accountOptsState)
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
        {accountOptsState && (
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
                onClick={() => (option.method(), setAccountOptsState(false))}
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
