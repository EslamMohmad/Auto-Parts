import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const { mainMenuState } = useSelector(({ PortalSlice }) => PortalSlice);

  const navigation = [
    { name: "home", path: "" },
    { name: "shop", path: "shop" },
    { name: "product", path: "product" },
    { name: "about us", path: "about-us" },
  ];

  const soicalMediaIcons = [
    "fa-brands fa-facebook-f",
    "fa-brands fa-pinterest",
    "fa-brands fa-x-twitter",
    "fa-brands fa-tiktok",
  ];

  return (
    <AnimatePresence>
      {mainMenuState && (
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: 0 }}
          exit={{ left: "-100%" }}
          transition={{ delay: 0.2 }}
          className="absolute w-full sm:w-[300px] sm:h-full z-10 bg-white pt-10 pb-5 px-6 h-[calc(100vh_-_56px)] sm:top-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="bg-gray-200 flex items-center gap-2 p-3 rounded-sm">
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                className="text-gray-400 mr-2"
                size="sm"
              />
              <form className="grow">
                <input
                  type="text"
                  placeholder="enter your keyword"
                  className="outline-none placeholder:uppercase  text-gray-500 text-[12px] w-full"
                />
              </form>
              <button className="cursor-pointer hover:bg-red-500 active:bg-red-500 rounded-full w-[30px] h-[30px] hover:text-white active:text-white transition-colors">
                <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-8">
              {navigation.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="uppercase text-sm hover:text-red-600 active:text-red-600 transition-colors duration-300 block text-left relative"
                  >
                    {name}
                    <FontAwesomeIcon
                      icon="fa-solid fa-chevron-right"
                      className="absolute right-0 top-1/4"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto text-sm">
              <div className="flex items-center gap-2 flex-nowrap">
                <h3 className="text-gray-600">
                  call us <span>: </span>
                </h3>
                <a href="tel:01002623871" className="text-gray-400 text-[12px]">
                  01002623871
                </a>
              </div>
              <div className="flex items-center gap-2 flex-nowrap">
                <h3 className="text-gray-600">
                  email <span>: </span>
                </h3>

                <a
                  href="mailto:eslammohmad998@gmail.com"
                  className="text-gray-400 text-[12px] text-ellipsis overflow-hidden"
                >
                  eslammohmad998@gmail.com
                </a>
              </div>
              <div className="flex gap-2 mt-3">
                {soicalMediaIcons.map((icon) => (
                  <button
                    key={icon}
                    className="w-[30px] h-[30px] leading-[30px] rounded-full bg-gray-900 text-center text-white cursor-pointer hover:bg-red-600 actiev:bg-red-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainMenu;
