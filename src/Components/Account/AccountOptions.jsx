import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth_logoutAccount } from "../../Store/APIS";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const AccountOptions = ({ accountOptions, route }) => {
  const action = useDispatch();

  const { order } = useParams();

  return (
    <div className="sm:sticky top-[80px] !w-[350px] h-fit border border-black/15 rounded-3xl overflow-hidden">
      <h1 className="p-6 px-7 text-xl uppercase">my account</h1>
      <div className="bg-black/5 rounded-t-3xl rounded-b-none flex flex-col">
        {accountOptions.map((account) => (
          <Link
            to={`${account.path}`}
            key={account.path}
            className={`py-6 mx-7 ${
              route ===
              (account.text !== "dashboard" || account.text === "log out"
                ? `my-account/${account.path}${
                    order ? "/" + order.replace(/\s/gi, "%20") : ""
                  }`
                : "my-account")
                ? "text-red-500"
                : "text-black/60 hover:text-red-500"
            } text-sm not-last:border-b border-black/15  transition-colors cursor-pointer`}
          >
            <FontAwesomeIcon icon={account.icon} size="md" />
            <span className="ml-4 capitalize">{account.text}</span>
          </Link>
        ))}
        <div
          className="cursor-pointer py-6 mx-7 text-black/60 text-sm not-last:border-b border-black/15 hover:text-black transition-colors"
          onClick={() => action(auth_logoutAccount())}
        >
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" size="md" />
          <span className="ml-4 capitalize">log out</span>
        </div>
      </div>
    </div>
  );
};

export default AccountOptions;
