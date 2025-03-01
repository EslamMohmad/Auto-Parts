import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { globalIcons } from "../Icons/GlobalIcons";
import Portal from "./Portal/Portal";

const WrapperComponent = () => {
  return (
    <div className="max-w-screen-2xl px-[25px] mx-auto mb-[63px] sm:mb-0">
      <Navbar />
      <Outlet />
      <Portal />
    </div>
  );
};

export default WrapperComponent;
globalIcons();
