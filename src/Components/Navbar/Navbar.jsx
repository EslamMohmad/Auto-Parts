import { useLocation } from "react-router-dom";
import Navbar_Top from "./Navbar_Top";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { searchMenuState, mainMenuState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const { pathname } = useLocation();

  const isHome =
    pathname === "/Auto-Parts" || pathname === "/Auto-Parts/" ? true : false;

  const overlayLayersHandler = () => {
    return searchMenuState || mainMenuState
      ? "z-30"
      : "z-20 shadow-[0_5px_55px] shadow-black/25 sm:shadow-none";
  };

  return (
    <nav
      className={`relative ${overlayLayersHandler()} ${
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
