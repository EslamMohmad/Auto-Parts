import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginMessage } from "../../Store/PortalSlice";
const WarniningMessage = () => {
  const { loginMessageState } = useSelector(({ PortalSlice }) => PortalSlice);

  let [counter, setCounter] = useState(200);

  const action = useDispatch();

  useEffect(() => {
    let timer;
    if (loginMessageState) {
      if (counter > 0) {
        timer = setTimeout(() => setCounter((counter -= 2)), 20);
      } else action(loginMessage(false)), setCounter(200);
    }
    return () => clearTimeout(timer);
  }, [counter, loginMessageState]);

  return (
    <AnimatePresence>
      {loginMessageState && (
        <motion.div
          initial={{ top: "-5%" }}
          animate={{ top: "8%" }}
          exit={{ top: "-5%" }}
          style={{ width: 200 + "px" }}
          className="fixed z-30 left-1/2 -translate-x-1/2 text-sm border border-black/20 bg-white shadow-box text-center  text-red-700 rounded-md"
        >
          <p className="py-3">you must sign up</p>
          <div
            style={{ width: counter + "px" }}
            className="h-[2px] w-full bg-green-500"
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WarniningMessage;
