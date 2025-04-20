import { useLocation } from "react-router-dom";
import Navbar_Top from "./Navbar_Top";
const Navbar = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/Auto-Parts" ? true : false;

  return (
    <nav
      className={`shadow-[0_5px_55px] shadow-black/25 sm:shadow-none ${
        isHome ? "bg-white" : "bg-yellow-300"
      }`}
    >
      <div className={`max-w-screen-2xl px-[25px] mx-auto`}>
        <Navbar_Top isHome={isHome} />
      </div>
    </nav>
  );
};

export default Navbar;
