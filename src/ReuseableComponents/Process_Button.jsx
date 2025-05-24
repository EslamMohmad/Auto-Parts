import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoadingState } from "../Store/PortalSlice";

import lightBars from "../Assets/Home/ProductsBanner/light bars.svg";
import darkBars from "../Assets/Home/ProductsBanner/dark bars.svg";
import { filteredObject } from "../Utils/Function";

const Process_Button = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const action = useDispatch();

  const delay = 1000;

  const filterdKeys = [
    "children",
    "methodname",
    "clickable",
    "afterloading",
    "outermethod",
    "color",
    "delay",
  ];

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
    <motion.button
      {...filteredObject(filterdKeys, props)}
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
          <img src={darkBars} className="relative w-[15px] mx-auto" />
        ) : (
          <img src={lightBars} className="relative w-[15px] mx-auto" />
        )
      ) : (
        props.children
      )}
    </motion.button>
  );
};

export default Process_Button;
