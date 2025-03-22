import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { globalIcons } from "../Icons/GlobalIcons";
import Portal from "./Portal/Portal";
import Footer from "./Footer/Footer";

const WrapperComponent = () => {
  return (
    <div className="mb-[63px] sm:mb-0">
      <main className="max-w-screen-2xl px-[25px] mx-auto">
        <Navbar />
        <Outlet />
        <Portal />
      </main>
      <Footer />
    </div>
  );
};

export default WrapperComponent;
globalIcons();
