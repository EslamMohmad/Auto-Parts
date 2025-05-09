import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { addKeysToFilter } from "../Store/ProductsSlice";
import { shop_getCategories } from "../Store/APIS";
import { useParams } from "react-router-dom";

const CheckboxInput = ({ index, li }) => {
  const { category } = useParams();

  const action = useDispatch();

  const inputRef = useRef();

  useEffect(() => {
    if (category) {
      category === li.name
        ? (inputRef.current.checked = true)
        : (inputRef.current.disabled = true);
    } else
      (inputRef.current.checked = false), (inputRef.current.disabled = false);
  }, [category]);

  return (
    <li className="list-none select-none text-[13px] py-2 whitespace-nowrap cursor-pointer hover:text-red-500 active:text-red-500 group flex items-center">
      <input
        ref={inputRef}
        name={typeof li.name === "object" ? index : li.name}
        id={typeof li.name === "object" ? index : li.name}
        type="checkbox"
        className="mr-3 accent-black w-[18px] h-[18px] cursor-pointer"
        onChange={({ target }) =>
          action(addKeysToFilter({ type: li.name, state: target.checked }))
        }
      />
      <label
        htmlFor={typeof li.name === "object" ? index : li.name}
        className="cursor-pointer grow"
      >
        {li.name}
        <span className="ml-1">({li.productsAmount})</span>
      </label>
    </li>
  );
};

const FilterComponent = ({ type, list }) => {
  const [listState, setListState] = useState(true);

  return (
    <div className="font-bold rounded-md border border-black/10">
      <button
        className="flex justify-between items-center w-full cursor-pointer capitalize p-4"
        onClick={() => setListState(!listState)}
      >
        {type}
        {listState ? (
          <FontAwesomeIcon icon="fa-solid fa-chevron-up" size="sm" />
        ) : (
          <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="sm" />
        )}
      </button>
      <AnimatePresence>
        {listState && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto", transition: { delay: 0.3 } }}
            exit={{ height: 0 }}
            className="overflow-hidden flex flex-col gap-1 pt-3 text-black/60 font-extralight border-t border-black/10 mx-3"
          >
            {list.map((li, index) => (
              <CheckboxInput key={index} li={li} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSection = () => {
  const { categories } = useSelector(({ ProductsSlice }) => ProductsSlice);

  const action = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      action(shop_getCategories());
    }
  }, [categories.length]);

  const filterTypes = {
    categories: [...categories],
    brands: [
      { name: "honda", productsAmount: 5 },
      { name: "hyundai", productsAmount: 6 },
      { name: "jaguar", productsAmount: 8 },
      { name: "lexus", productsAmount: 7 },
      { name: "toyota", productsAmount: 3 },
      { name: "lotus", productsAmount: 2 },
    ],
    // sizes: [
    //   { name: "16 inch", productsAmount: 5 },
    //   { name: "18 inch", productsAmount: 6 },
    //   { name: "19 inch", productsAmount: 4 },
    //   { name: "22 inch", productsAmount: 2 },
    // ],
    // ratings: [
    //   { name: <Rating rating={5} />, productsAmount: 5 },
    //   { name: <Rating rating={4} />, productsAmount: 3 },
    //   { name: <Rating rating={3} />, productsAmount: 4 },
    //   { name: <Rating rating={2} />, productsAmount: 2 },
    //   { name: <Rating rating={1} />, productsAmount: 0 },
    // ],
  };

  return (
    <div className="flex flex-col gap-8 py-8 border-t  border-t-black/20">
      {Object.keys(filterTypes).map((section) => (
        <FilterComponent
          key={section}
          type={section}
          list={filterTypes[section]}
        />
      ))}
    </div>
  );
};

export default FilterSection;
