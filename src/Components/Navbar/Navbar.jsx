import Navbar_Top from "./Navbar_Top";
import { useSelector } from "react-redux";
import useHomePage from "../../Hooks/useHomePage";
const Navbar = () => {
  const { searchMenuState, mainMenuState, fixedNavbarState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const isHome = useHomePage();

  const overlayLayersHandler = () => {
    return searchMenuState || mainMenuState ? "z-30" : "z-20";
  };

  return (
    <nav
      className={`relative shadow-[0_5px_55px] shadow-black/25 sm:shadow-none ${overlayLayersHandler()} ${
        isHome ? "bg-white" : "bg-yellow-300"
      } ${fixedNavbarState ? "h-[60px] sm:h-[172px] lg:h-[156px]" : ""}`}
    >
      <div className={`max-w-screen-2xl px-[25px] mx-auto`}>
        {!fixedNavbarState && <Navbar_Top isHome={isHome} />}
      </div>
    </nav>
  );
};

export default Navbar;
