import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchMenu } from "../../Store/PortalSlice";

const Navbar_Top_Mobile_Search = () => {
  const { searchMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  const action = useDispatch();

  return (
    <div
      className="hover:text-red-600 active:text-red-600 cursor-pointer transition-colors sm:hidden block"
      onClick={() => action(toggleSearchMenu(searchMenuState ? false : true))}
    >
      <FontAwesomeIcon
        icon={`fa-solid fa-${searchMenuState ? "xmark" : "magnifying-glass"}`}
      />
    </div>
  );
};

export default Navbar_Top_Mobile_Search;
