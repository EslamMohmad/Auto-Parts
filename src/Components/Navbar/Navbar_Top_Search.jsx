import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const Navbar_Top_Search = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  return (
    <div className="border rounded-3xl border-gray-300 py-1 w-full lg:w-[400px] min-w-[190px] items-center relative shadow order-2 lg:order-none hidden sm:flex">
      <div
        className={`text-gray-400 uppercase absolute left-6 ${
          inputFocus ? "top-2 text-[8px]" : "top-5 text-[10px]"
        } transition-all duration-200`}
      >
        enter your keyword
      </div>
      <form className="w-[90%]">
        <input
          type="text"
          className="pt-4 pb-2 outline-none pl-6 text-[12px] font-extralight tracking-wider text-gray-600 w-full relative"
          value={inputValue}
          ref={inputRef}
          onFocus={() => setInputFocus(true)}
          onBlur={() => !inputValue && setInputFocus(false)}
          onChange={() => setInputValue(inputRef.current.value)}
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

export default Navbar_Top_Search;
