import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { globalIcons } from "../Icons/GlobalIcons";
import Portal from "./Portal/Portal";

const WrapperComponent = () => {
  return (
    <main className="max-w-screen-2xl px-[25px] mx-auto mb-[63px] sm:mb-0">
      <Navbar />
      <Outlet />
      <Portal />
    </main>
  );
};

export default WrapperComponent;
globalIcons();
