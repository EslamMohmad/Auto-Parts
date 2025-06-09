import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import SearchInput from "../../ReuseableComponents/SearchInput";
import { useSelector } from "react-redux";

const Navbar_Top_Search = ({ state }) => {
  const {
    inputSearchStates: { inputValue, inputFocus },
  } = useSelector(({ SearchSlice }) => SearchSlice);

  return (
    <div
      className={`border rounded-3xl ${
        state ? "border-gray-300" : "border-transparent bg-white"
      } py-1 my-3 w-full lg:w-[400px] min-w-[190px] items-center relative shadow order-2 lg:order-none hidden sm:flex`}
    >
      <div
        className={`text-gray-400 uppercase absolute left-7 ${
          inputValue && inputFocus ? "top-2 text-[8px]" : "top-5 text-[10px]"
        } transition-all duration-300`}
      >
        enter your keyword
      </div>
      <form className="w-[90%]">
        <SearchInput
          className="pt-4 pb-2 outline-none pl-6 text-[12px] font-extralight tracking-wider text-gray-600 w-full relative rounded-2xl ml-1"
          name="navbar-search"
        />
      </form>
      <button className="ml-auto mr-2">
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          className="grow hover:text-red-600 active:text-red-600 cursor-pointer transition-colors"
        />
      </button>
    </div>
  );
};

export default memo(Navbar_Top_Search);
