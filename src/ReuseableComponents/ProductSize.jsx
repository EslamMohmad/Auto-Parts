import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import Button_Title from "./Button_Title";
import { AnimatePresence, motion } from "framer-motion";

const ProductSize = ({ size, setSize, details }) => {
  const defaultSelectRef = useRef();

  useEffect(() => {
    if (!size.value) defaultSelectRef.current.selected = true;
  }, [size.value]);

  const sizes = [
    { value: 16, price: "$90.00", stock: 9 },
    { value: 18, price: "$100.00", stock: 3 },
    { value: 19, price: "$110.00", stock: 1 },
    { value: 20, price: "$120.00", stock: 7 },
  ];

  const selectInputHandler = (val) => {
    setSize(() => {
      const target = sizes.find(({ value }) => +val === value);
      if (target) return target;
      else return { value: "" };
    });
  };

  return (
    <>
      <div className="pt-5 flex gap-5 items-center justify-between flex-wrap">
        <h6 className="font-bold text-sm whitespace-nowrap">
          size : {size.value} {size.value ? "inch" : ""}
        </h6>
        <div className="grow flex">
          <select
            name="product-quick-view-select-size"
            className="py-3 px-5 rounded-3xl outline-none border border-black/20 text-[11px] text-black/60 first-letter:uppercase cursor-pointer mr-auto"
            onChange={({ target }) => selectInputHandler(target.value)}
          >
            <option ref={defaultSelectRef} value="choose an option">
              choose an option
            </option>
            {sizes.map(({ value, price }) => (
              <option
                value={value}
                key={price}
                className="text-[11px] text-black/60"
              >
                {value} inch
              </option>
            ))}
          </select>
          {size.value && (
            <button
              className="relative w-[40px] h-[40px] leading-[40px] text-center rounded-full active:text-white hover:text-white hover:bg-red-500 active:bg-red-500 group transition-colors cursor-pointer ml-auto"
              onClick={() => setSize({ value: "", price: "" })}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
              <Button_Title title="clear" />
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {size.value && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex justify-between items-center"
          >
            <p
              className={`${
                !details?.stock ? "text-red-600" : "text-green-700"
              } font-extralight text-sm`}
            >
              {details?.stock ? (
                <FontAwesomeIcon icon="fa-regular fa-circle-check" size="xl" />
              ) : (
                <FontAwesomeIcon icon="fa-regular fa-circle-xmark" size="xl" />
              )}
              <span className="ml-3">{details?.stock} in stock</span>
            </p>
            <h1 className="text-2xl font-bold">{details?.price}</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductSize;
