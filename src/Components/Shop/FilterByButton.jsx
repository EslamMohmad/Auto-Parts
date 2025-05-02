import { useDispatch } from "react-redux";
import { toggleFilterMenuState } from "../../Store/PortalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterByButton = () => {
  const action = useDispatch();

  return (
    <button
      onClick={() => action(toggleFilterMenuState(true))}
      className={`uppercase whitespace-nowrap sm:text-xl font-bold cursor-pointer border border-black/30 py-3 px-4 rounded-xl sm:mb-3 hover:bg-black hover:text-white transition-colors w-fit`}
    >
      <FontAwesomeIcon icon="fa-solid fa-sliders" className="mr-3" />
      filter by
    </button>
  );
};

export default FilterByButton;
