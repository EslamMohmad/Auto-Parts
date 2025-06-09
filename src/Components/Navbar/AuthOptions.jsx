import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { accountOptions } from "../../Pages/Account";
import { toggleAccountOptions } from "../../Store/AuthSlice";
import { auth_logoutAccount } from "../../Store/APIS";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const AuthOptions = ({ accountOptionsState, pathname }) => {
  const isMobile = useMediaQuery("(max-width : 639px)");

  const action = useDispatch();

  return (
    <AnimatePresence>
      {!isMobile && !pathname.includes("my-account") && accountOptionsState && (
        <motion.ul
          initial={{ opacity: 0, top: "200%" }}
          animate={{ opacity: 1, top: "160%" }}
          exit={{ opacity: 0, top: "200%" }}
          className="absolute z-10 bg-white px-5 rounded-md border border-black/10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {accountOptions.map(({ text, path }) => (
            <Link
              to={text === "dashboard" ? "my-account" : `my-account/${path}`}
              key={path}
              className="text-black/70 text-[13px] px-4 py-3 pl-0 text-left whitespace-nowrap not-last-of-type:border-b hover:text-red-500 border-b-black/10"
              onClick={() => action(toggleAccountOptions(false))}
            >
              {text}
            </Link>
          ))}
          <li
            className="text-black/70 text-[13px] px-4 py-3 pl-0 text-left whitespace-nowrap not-last-of-type:border-b hover:text-red-500 border-b-black/10"
            onClick={() => (
              action(auth_logoutAccount()), action(toggleAccountOptions(false))
            )}
          >
            log out
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default AuthOptions;
