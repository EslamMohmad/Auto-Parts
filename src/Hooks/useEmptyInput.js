import { useEffect } from "react";

const useEmptyInput = (state, inputs) => {
  useEffect(() => {
    inputs.forEach((element) => {
      element.current.value && (element.current.value = "");
    });
  }, [state]);
};

export default useEmptyInput;
