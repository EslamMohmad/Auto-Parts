import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../Store/PortalSlice.js";
import { js } from "@eslint/js";

const Navbar_Top_Menu = () => {
  const { mainMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  const action = useDispatch();

  return (
    <div
      className="block lg:hidden hover:text-red-600 active:text-red-600 transition-colors cursor-pointer"
      onClick={() => action(toggleMainMenu(mainMenuState ? false : true))}
    >
      <div className="w-[20px] flex flex-col gap-1 group [&>span]:group-hover:bg-red-600 [&>span]:group-active:bg-red-600 [&>span]:transition-all ">
        <span
          className={`w-full h-0.5 bg-black origin-right ${
            mainMenuState ? "-rotate-[37deg]" : "rotate-0"
          }`}
        ></span>
        <span
          className={`w-full h-0.5 bg-black ${
            mainMenuState ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`w-full h-0.5 bg-black origin-right ${
            mainMenuState ? "rotate-[37deg]" : "rotate-0"
          }`}
        ></span>
      </div>
    </div>
  );
};

export default Navbar_Top_Menu;
