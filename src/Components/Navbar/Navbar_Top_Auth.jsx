import { useDispatch, useSelector } from "react-redux";
import { toggleAuthState } from "../../Store/PortalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getUserData, toggleAccountOptions } from "../../Store/AuthSlice";
import { Link, useLocation } from "react-router-dom";
import { auth_logoutAccount } from "../../Store/APIS";
import { auth, database } from "../../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { accountOptions } from "./../../Pages/Account";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { child, get, ref } from "firebase/database";

const Navbar_Top_Auth = () => {
  const { userData, accountOptionsState } = useSelector(
    ({ AuthSlice }) => AuthSlice
  );

  const action = useDispatch();

  const isMobile = useMediaQuery("(max-width : 639px)");

  const { pathname } = useLocation();

  useEffect(() => {
    if (accountOptionsState) {
      document.body.addEventListener("click", function () {
        action(toggleAccountOptions(false));
      });
    }
  }, [accountOptionsState]);

  useEffect(() => {
    auth.currentUser &&
      !userData?.email_address &&
      onAuthStateChanged(auth, (user) => {
        const userRef = child(ref(database), `Auto-Parts-Users/${user?.uid}`);
        get(userRef).then(
          (result) => result.val() && action(getUserData(result.val() || {}))
        );
      });
  }, [auth.currentUser, userData?.email_address]);

  useEffect(() => {
    pathname.includes("checkout") &&
      !auth.currentUser &&
      action(toggleAuthState(true));
  }, [pathname, auth.currentUser]);

  return (
    <button
      className={`relative items-center gap-2 hidden sm:flex group ${
        !pathname.includes("my-account") && "cursor-pointer"
      } `}
      onClick={(e) => (
        e.stopPropagation(),
        userData?.email_address
          ? !pathname.includes("my-account") &&
            action(toggleAccountOptions(!accountOptionsState))
          : action(toggleAuthState(true))
      )}
    >
      <FontAwesomeIcon
        icon="fa-regular fa-user"
        className={`${
          !pathname.includes("my-account") &&
          "group-hover:text-red-600 active:text-red-600 duration-300 transition-colors cursor-pointer"
        } text-[25px]`}
        {...(userData?.email_address ? null : { title: "sign up" })}
      />
      {userData?.email_address && (
        <div>
          <h1 className="font-bold leading-5">account</h1>
          <p className="text-[10px] font-light capitalize text-ellipsis overflow-hidden whitespace-nowrap w-[65px]">
            hello, {userData?.displayName}
          </p>
        </div>
      )}
      <AnimatePresence>
        {!isMobile &&
          !pathname.includes("my-account") &&
          accountOptionsState && (
            <motion.ul
              initial={{ opacity: 0, top: "200%" }}
              animate={{ opacity: 1, top: "160%" }}
              exit={{ opacity: 0, top: "200%" }}
              className="absolute bg-white px-5 rounded-md border border-black/10 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {accountOptions.map(({ text, path }) => (
                <Link
                  to={
                    text === "dashboard" ? "my-account" : `my-account/${path}`
                  }
                  key={path}
                  className="text-black/70 text-[13px] px-4 py-3 pl-0 text-left whitespace-nowrap not-last-of-type:border-b hover:text-red-500 border-b-black/10"
                  onClick={() => action(toggleAccountOptions(false))}
                >
                  {text}
                </Link>
              ))}
              <li
                className="text-black/70 text-[13px] px-4 py-3 pl-0 text-left whitespace-nowrap not-last-of-type:border-b hover:text-red-500 border-b-black/10"
                onClick={() => (
                  action(auth_logoutAccount()),
                  action(toggleAccountOptions(false))
                )}
              >
                log out
              </li>
            </motion.ul>
          )}
      </AnimatePresence>
    </button>
  );
};

export default Navbar_Top_Auth;
