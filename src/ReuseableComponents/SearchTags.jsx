import { useDispatch } from "react-redux";
import { setSearchState } from "../Store/SearchSlice";

const SearchTags = () => {
  const action = useDispatch();

  const tags = [
    "car accessories",
    "usb-c",
    "peugeot",
    "steering wheel cover",
    "premium",
    "engine oil",
    "alloy wheel",
    "brakes",
    "performance",
    "golf cart",
  ];

  return (
    <ul className="flex gap-3 flex-wrap">
      {tags.map((list) => (
        <li
          key={list}
          onClick={() => action(setSearchState({ state: true, value: list }))}
          className="text-[11px] bg-gray-200 py-2 px-5 text-gray-500 cursor-pointer hover:bg-red-500 hover:text-white active:text-white transition-colors"
        >
          {list}
        </li>
      ))}
    </ul>
  );
};

export default SearchTags;
