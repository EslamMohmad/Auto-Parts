import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterSection from "../../ReuseableComponents/FilterSection";

const Filtering = () => {
  return (
    <aside>
      <h1 className={`uppercase text-xl font-bold h-[69px] leading-[69px]`}>
        <FontAwesomeIcon icon="fa-solid fa-sliders" className="mr-3" />
        filter by
      </h1>
      <FilterSection />
    </aside>
  );
};

export default Filtering;
