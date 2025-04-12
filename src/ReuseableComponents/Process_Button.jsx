import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoadingState } from "../Store/PortalSlice";

import lightBars from "../Assets/Home/ProductsBanner/light bars.svg";
import darkBars from "../Assets/Home/ProductsBanner/dark bars.svg";

const Process_Button = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const action = useDispatch();

  const delay = 1000;

  const filteredObject = () => {
    const result = {};
    const filter = Object.keys(props).filter(
      (key) =>
        key !== "children" &&
        key !== "methodname" &&
        key !== "clickable" &&
        key !== "afterloading" &&
        key !== "outermethod" &&
        key !== "color" &&
        key !== "delay"
    );
    filter.map((key) => (result[key] = props[key]));
    return result;
  };

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(
        () => (
          setIsLoading(false),
          props.afterloading?.length &&
            props.afterloading.forEach((method) => action(method)),
          props.outermethod && props.outermethod(),
          action(toggleLoadingState({ state: false, method: "" }))
        ),
        props.delay || delay
      );
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <motion.div
      {...filteredObject()}
      onClick={
        props.clickable
          ? () => (
              setIsLoading(true),
              action(
                toggleLoadingState({
                  state: true,
                  method: props.methodname || "",
                })
              )
            )
          : undefined
      }
    >
      {isLoading ? (
        props.color === "dark" ? (
          <img
            src={darkBars}
            className="relative w-[15px] mx-auto -translate-y-1/2 top-1/2 pt-4"
          />
        ) : (
          <img
            src={lightBars}
            className="relative w-[15px] mx-auto -translate-y-1/2 top-1/2"
          />
        )
      ) : (
        props.children
      )}
    </motion.div>
  );
};

export default Process_Button;
