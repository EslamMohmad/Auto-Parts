import { Link } from "react-router-dom";
import Navbar_Top_Search from "./Navbar_Top_Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar_Top_Menu from "./Navbar_Top_Menu";
import Navbar_Top_Cart from "./Navbar_Top_Cart";
import { useSelector } from "react-redux";
import Navbar_Top_Mobile_Search from "./Navbar_Top_Mobile_Search";
import useMediaQuery from "../../Hooks/useMediaQuery";
import Navbar_Top_Auth from "./Navbar_Top_Auth";
import Logo from "../../ReuseableComponents/Logo";

const Navbar_Top = ({ fixedNavbar, isHome }) => {
  const {
    cartMenuState,
    newsLetterPopupState,
    mainMenuState,
    authState,
    userOptionsMenuState,
  } = useSelector(({ PortalSlice }) => PortalSlice);

  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1024px)");

  const navigation = [
    { name: "home", path: "" },
    { name: "shop", path: "shop" },
    { name: "product", path: "product" },
    { name: "about us", path: "about-us" },
  ];

  return (
    <section
      className={`-mx-[25px] sm:mx-auto flex items-center sm:flex-wrap lg:flex-nowrap justify-between gap-5 ${
        fixedNavbar &&
        `${isHome && "bg-white"}` &&
        `${!isHome && "bg-transparent"}`
      } ${
        cartMenuState ||
        newsLetterPopupState ||
        authState ||
        userOptionsMenuState ||
        (isTablet && mainMenuState)
          ? "sm:z-auto"
          : "z-20 relative"
      } ${
        fixedNavbar
          ? "px-[49px] sm:px-[24px] py-4 sm:py-[12px]"
          : "py-4 px-[15px] sm:pt-[40px] sm:pb-0 sm:px-0 lg:pb-[40px]  "
      }`}
    >
      <Navbar_Top_Menu />
      <Navbar_Top_Mobile_Search />
      <Link to="" className="mx-auto sm:mr-auto lg:mr-0 sm:mx-0">
        <Logo />
      </Link>
      <ul
        className={`gap-10 ${
          fixedNavbar ? "mr-auto ml-10" : "mr-5"
        } hidden lg:flex`}
      >
        {navigation.map(({ name, path }) => (
          <li key={path} className="min-w-[fit-content]">
            <Link
              to={path}
              className="text-[14px] hover:text-red-600 active:text-red-600 transition-colors duration-300 text-center"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      {!fixedNavbar && <Navbar_Top_Search state={isHome} />}
      <div className="flex gap-5 items-center">
        <Navbar_Top_Auth />
        <div className="flex gap-7">
          <div className="relative hover:text-red-600 active:text-red-600 cursor-pointer transition-colors hidden sm:block">
            <FontAwesomeIcon icon="fa-regular fa-heart" size="xl" />
            <span className="absolute -right-3 -top-3 text-white bg-red-600 rounded-full w-[17px] h-[17px] leading-[17px] text-[8px] text-center">
              0
            </span>
          </div>
          <Navbar_Top_Cart />
        </div>
      </div>
    </section>
  );
};

export default Navbar_Top;
