import { useDispatch } from "react-redux";
import { toggleAuthState } from "../../Store/PortalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar_Top_Auth = () => {
  const action = useDispatch();

  return (
    <button
      className="items-center gap-4 hidden sm:flex group cursor-pointer"
      onClick={() => action(toggleAuthState(true))}
    >
      <FontAwesomeIcon
        icon="fa-regular fa-user"
        className="group-hover:text-red-600 active:text-red-600 duration-300 transition-colors cursor-pointer text-[25px]"
      />
      <div>
        <h1 className="font-bold leading-5">account</h1>
        <p className="text-[10px] font-light">hello, login</p>
      </div>
    </button>
  );
};

export default Navbar_Top_Auth;
