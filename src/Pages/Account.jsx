import { child, get, ref } from "firebase/database";
import { useEffect } from "react";
import { database } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Account = () => {
  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);

  const accountOptions = [
    {
      icon: "fa-regular fa-heart",
      option: "wishlist",
      path: "../my-account/wishlist",
      component: <></>,
    },
    {
      icon: "fa-solid fa-basket-shopping",
      option: "orders",
      path: "../my-account/orders",
      component: <></>,
    },
    {
      icon: "fa-solid fa-gear",
      option: "dashboard",
      path: "../my-account",
      component: <></>,
    },
    {
      icon: "fa-regular fa-user",
      option: "account Details",
      path: "../my-account/account-Details",
      component: <></>,
    },
  ];

  useEffect(() => {
    const myRef = child(
      ref(database),
      `Auto-Parts-Users/${userData?.displayName}`
    );
    get(myRef).then((res) => console.log(res.val()));
  }, [userData.displayName]);

  return (
    <section>
      <div className="my-10 flex gap-10">
        <div className="w-[35%] border border-black/10 rounded-3xl overflow-hidden">
          <h1 className="p-6 px-7 text-xl uppercase">my account</h1>
          <div className="bg-black/5 rounded-t-3xl rounded-b-none flex flex-col">
            {accountOptions.map((account) => (
              <Link
                to={account.path}
                key={account.option}
                className="py-6 mx-7 text-black/60 text-sm not-last:border-b border-black/15 hover:text-black transition-colors"
              >
                <FontAwesomeIcon icon={account.icon} size="md" />
                <span className="ml-4 capitalize">{account.option}</span>
              </Link>
            ))}
            <div className="cursor-pointer py-6 mx-7 text-black/60 text-sm not-last:border-b border-black/15 hover:text-black transition-colors">
              <FontAwesomeIcon
                icon="fa-solid fa-right-from-bracket"
                size="md"
              />
              <span className="ml-4 capitalize">log out</span>
            </div>
          </div>
        </div>
        <div className="grow"></div>
      </div>
    </section>
  );
};

export default Account;
