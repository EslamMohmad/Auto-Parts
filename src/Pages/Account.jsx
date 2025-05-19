import { useLocation } from "react-router-dom";
import useMediaQuery from "../Hooks/useMediaQuery";

import AccountOptions from "../Components/Account/AccountOptions";

import Dashboard from "./../Components/Account/Dashboard";
import Wishlist from "./../Components/Account/Wishlist";
import AccountDetails from "./../Components/Account/AccountDetails";
import Orders from "./../Components/Account/Orders";
import { useSelector } from "react-redux";

export const accountOptions = [
  {
    icon: "fa-regular fa-user",
    path: "my-account",
    text: "dashboard",
  },
  {
    icon: "fa-regular fa-heart",
    path: "my-account/wishlist",
    text: "wishlist",
  },
  {
    icon: "fa-solid fa-basket-shopping",
    path: "my-account/orders",
    text: "orders",
  },

  {
    icon: "fa-solid fa-user-gear",
    path: "my-account/account-details",
    text: "account details",
  },
];

const Account = () => {
  const lessDesktop = useMediaQuery("(max-width : 1024px)");

  const route = useLocation().pathname.replace("/Auto-Parts/", "");

  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);

  const accountComponents = {
    "my-account": <Dashboard details={userData} />,
    "my-account/wishlist": <Wishlist details={userData?.wishlist || {}} />,
    "my-account/orders": <Orders details={userData?.orders} />,
    "my-account/account-details": <AccountDetails details={userData} />,
  };

  return (
    <section>
      <div className="my-10 flex gap-10">
        {!lessDesktop && (
          <AccountOptions accountOptions={accountOptions} route={route} />
        )}
        <div className="md:grow">{accountComponents[route]}</div>
      </div>
    </section>
  );
};

export default Account;
