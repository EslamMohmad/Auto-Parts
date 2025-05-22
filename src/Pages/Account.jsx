import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "../Hooks/useMediaQuery";
import AccountOptions from "../Components/Account/AccountOptions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const accountOptions = [
  {
    icon: "fa-regular fa-user",
    path: "",
    text: "dashboard",
    option: "dashboard",
  },
  {
    icon: "fa-regular fa-heart",
    path: "wishlist",
    text: "wishlist",
    option: "wishlist",
  },
  {
    icon: "fa-solid fa-basket-shopping",
    path: "orders",
    text: "orders",
    option: "orders",
  },

  {
    icon: "fa-solid fa-user-gear",
    path: "account-details",
    text: "account details",
    option: "account-details",
  },
];

const Account = () => {
  const lessDesktop = useMediaQuery("(max-width : 1024px)");

  const route = useLocation().pathname.replace("/Auto-Parts/", "");

  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);

  const navTo = useNavigate();

  useEffect(() => {
    if (!userData?.email_address) {
      navTo("../");
    }
  }, [route, userData?.email_address]);

  return (
    <section>
      <div className="my-10 flex gap-10">
        {!lessDesktop && (
          <AccountOptions accountOptions={accountOptions} route={route} />
        )}
        <Outlet />
      </div>
    </section>
  );
};

export default Account;
