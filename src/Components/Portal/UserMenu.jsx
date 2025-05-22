import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserOptionsMenu } from "../../Store/PortalSlice";
import { accountOptions } from "../../Pages/Account";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth_logoutAccount } from "../../Store/APIS";

const UserMenu = () => {
  const { userOptionsMenuState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const action = useDispatch();

  const navTo = useNavigate();

  const { order } = useParams();

  const options = {
    dashboard: "bottom-[130px] sm:bottom-[87px] left-[10px]",
    wishlist: "bottom-[133px] sm:bottom-[89px] left-[46px]",
    orders: "bottom-[107px] sm:bottom-[63px] left-[72px]",
    "account details": "bottom-[72px] sm:bottom-[27px] left-[72px]",
    "log out": "bottom-[48px] sm:bottom-[3px] left-[44px]",
  };

  const acountMenu = [
    ...accountOptions,
    {
      icon: "fa-solid fa-right-from-bracket",
      option: "log-out",
      path: "",
      text: "log out",
    },
  ].map((option) => ({
    ...option,
    location: options[option.text],
    method: () => {
      action(toggleUserOptionsMenu(false));
      return option.text !== "log out"
        ? navTo(
            option.text === "dashboard"
              ? "my-account"
              : `my-account/${option.path}`
          )
        : action(auth_logoutAccount());
    },
  }));

  const route = useLocation().pathname.replace("/Auto-Parts/", "");

  const handleActiveSection = (path) => {
    if (
      route ===
      (path !== "dashboard" || path === "log out"
        ? `my-account/${path}${order ? "/" + order.replace(/\s/gi, "%20") : ""}`
        : "my-account")
    ) {
      return "bg-black text-white";
    }
    return "bg-white hover:bg-black hover:text-white active:bg-black active:text-white";
  };

  return (
    <div>
      <div
        className="fixed z-20 bottom-20 sm:bottom-9 left-5 bg-white hover:bg-black hover:text-white active:bg-black active:text-white w-[50px] h-[50px] leading-[50px] text-center rounded-full shadow-box cursor-pointer"
        onClick={() => action(toggleUserOptionsMenu(true))}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-gear"
          className={`${
            userOptionsMenuState && "rotate-180"
          } transition-transform duration-500`}
        />
      </div>

      {acountMenu.map((list, index) => (
        <div
          title={list.text}
          onClick={list.method}
          key={list.text}
          test={list.text + "   " + route}
          style={{ transitionDuration: 300 + 200 * index + "ms" }}
          className={`fixed z-10 shadow-box  ${handleActiveSection(
            list.option
          )} ${
            userOptionsMenuState
              ? list.location + " !duration-300"
              : `bottom-22.5 sm:bottom-11.5 left-7.5`
          } w-[30px] h-[30px] leading-[30px] text-center rounded-full shadow-box transition-all`}
        >
          <FontAwesomeIcon icon={list.icon} />
        </div>
      ))}
    </div>
  );
};

export default UserMenu;
