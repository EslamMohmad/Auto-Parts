import { useDispatch, useSelector } from "react-redux";
import { toggleAuthState } from "../../Store/PortalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { getUserData, toggleAccountOptions } from "../../Store/AuthSlice";
import { useLocation } from "react-router-dom";
import { auth, database } from "../../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import AuthOptions from "./AuthOptions";

const Navbar_Top_Auth = () => {
  const { userData, accountOptionsState } = useSelector(
    ({ AuthSlice }) => AuthSlice
  );
  const { fixedNavbarState } = useSelector(({ PortalSlice }) => PortalSlice);

  const action = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    if (accountOptionsState) {
      document.body.addEventListener("click", function () {
        action(toggleAccountOptions(false));
      });
    }
  }, [accountOptionsState]);

  useEffect(() => {
    action(toggleAccountOptions(false));
  }, [fixedNavbarState]);

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
      <AuthOptions
        accountOptionsState={accountOptionsState}
        pathname={pathname}
      />
    </button>
  );
};

export default Navbar_Top_Auth;
