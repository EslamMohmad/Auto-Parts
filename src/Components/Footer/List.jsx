import { useEffect, useState } from "react";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

const List = ({ parent, lists, index }) => {
  const isMobile = useMediaQuery("(max-width : 640px)");
  const [state, setState] = useState(isMobile ? !false : true);

  useEffect(() => {
    if (isMobile) setState(false);
  }, [isMobile]);

  return (
    <motion.div
      key={parent}
      className="w-full sm:w-[43%] lg:w-auto"
      initial={{ opacity: 0, y: "50px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: `${0.5 + index / 10}` }}
      viewport={{ margin: "-100px", once: true }}
    >
      <div
        className="flex justify-between items-center"
        onClick={() => setState(!state)}
      >
        <h4 className="uppercase font-bold mb-4 sm:mb-8">{parent}</h4>
        {isMobile &&
          (state ? (
            <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
          ))}
      </div>
      <AnimatePresence>
        {state && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="flex flex-col gap-3 overflow-hidden"
          >
            {lists[parent].map((child) => (
              <li
                key={child}
                className="text-[13px] text-black/60 hover:text-red-600 active:text-red-600 transition-colors cursor-pointer"
              >
                {child}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default List;
