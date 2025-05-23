import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { globalIcons } from "../Icons/GlobalIcons";
import Portal from "./Portal/Portal";
import Footer from "./Footer/Footer";
import usePrevState from "../Hooks/usePrevState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeOverlay } from "../Store/PortalSlice";
import useScrollTop from "../Hooks/useScrollTop";

const WrapperComponent = () => {
  const { overlayState } = useSelector(({ PortalSlice }) => PortalSlice);

  const { pathname } = useLocation();

  const prevPathname = usePrevState(pathname);

  const action = useDispatch();

  useScrollTop(pathname);

  useEffect(() => {
    if (overlayState && pathname !== prevPathname) {
      action(closeOverlay());
    }
  }, [pathname]);

  return (
    <div className="mb-[63px] sm:mb-0">
      <Navbar />
      <main className="max-w-screen-2xl px-[25px] mx-auto">
        <Outlet />
        <Portal />
      </main>
      <Footer />
    </div>
  );
};

export default WrapperComponent;
globalIcons();
