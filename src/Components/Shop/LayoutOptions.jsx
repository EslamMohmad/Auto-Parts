import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../Hooks/useMediaQuery";
import FilterByButton from "./FilterByButton";

const TableGrid = ({ props, setGrids }) => {
  const table = Array.from(
    { length: props.squareNumber },
    (_, index) => index + 1
  );

  const gridHandler = () => {
    setGrids((prev) =>
      prev.map((e) =>
        e.squareNumber === props.squareNumber
          ? { ...e, state: true }
          : { ...e, state: false }
      )
    );
  };

  return (
    <div
      className={`grid gap-[5px] w-[max-content] ${
        props.state ? "bg-black" : "hover:bg-black"
      } p-[5px] transition-all cursor-pointer group rounded-[2px]`}
      onClick={gridHandler}
      style={{
        gridTemplateColumns: `repeat(${props.squareNumber}, minmax(0, 1fr))`,
      }}
    >
      {table.map((square) => (
        <span
          key={square}
          className={`border border-black/70 w-[10px] h-[10px] ${
            props.state ? "border-white" : "group-hover:border-white"
          } transition-all`}
        ></span>
      ))}
    </div>
  );
};

const List = ({ list, setList, type }) => {
  const ref = useRef();

  return (
    <li
      className="text-[13px] px-5 py-2 whitespace-nowrap cursor-pointer hover:text-red-500 active:text-red-500 group"
      onClick={() => setList({ type, state: false })}
      onMouseOver={() => (ref.current.checked = true)}
      onMouseOut={() => list.type !== type && (ref.current.checked = false)}
    >
      <input
        name={type}
        id={type}
        ref={ref}
        type="checkbox"
        className="mr-3 accent-black w-[18px] h-[18px] cursor-pointer"
        defaultChecked={list.type === type}
      />
      <label htmlFor={type} className="cursor-pointer">
        {type}
      </label>
    </li>
  );
};

const SortingButton = () => {
  const [list, setList] = useState({ state: false, type: "default sorting" });

  const types = [
    "default sorting",
    "sort by popularity",
    "sort by average rating",
    "sort by latest",
    "sort by price : low to high",
    "sort by price : high to low",
  ];

  return (
    <>
      <button
        className="text-sm py-3 px-5 bg-white cursor-pointer w-fit text-ellipsis overflow-hidden whitespace-nowrap max-w-[130px] border border-black/15 rounded-lg"
        onClick={() => setList({ ...list, state: !list.state })}
      >
        {list.type}
        {list.state ? (
          <FontAwesomeIcon
            icon="fa-solid fa-chevron-up"
            size="sm"
            className="ml-2"
          />
        ) : (
          <FontAwesomeIcon
            icon="fa-solid fa-chevron-down"
            size="sm"
            className="ml-2"
          />
        )}
      </button>
      <AnimatePresence>
        {list.state && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className={`absolute top-[115%] right-0 bg-white z-10 overflow-hidden shadow-2xl rounded-md p-2`}
          >
            {types.map((type) => (
              <List key={type} list={list} setList={setList} type={type} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

const LayoutOptions = ({ setColumns, currLength, allProducts, isMobile }) => {
  const diffGridsArray = [
    { squareNumber: 4, state: true },
    { squareNumber: 3, state: false },
    { squareNumber: 2, state: false },
  ];

  const [grids, setGrids] = useState(diffGridsArray);

  const index = grids.findIndex((grid) => grid.state);

  useEffect(() => {
    setColumns(grids[index].squareNumber);
  }, [index]);

  return (
    <div className="p-3 bg-black/5 rounded-md flex gap-2 justify-between items-center">
      {isMobile ? (
        <FilterByButton />
      ) : (
        <div className="hidden sm:flex gap-2 items-center">
          {grids.map((grid) => (
            <TableGrid
              key={grid.squareNumber}
              props={grid}
              setGrids={setGrids}
            />
          ))}
          <h5 className="hidden sm:block text-[12px] text-black/50 mr-7 ml-3 whitespace-nowrap text-ellipsis overflow-hidden">
            showing {currLength} of {allProducts} results
          </h5>
        </div>
      )}
      <div className="relative ml-auto">
        <SortingButton />
      </div>
    </div>
  );
};

export default LayoutOptions;
