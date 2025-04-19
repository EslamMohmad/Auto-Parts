import { useEffect } from "react";

const useScrollTop = (route) => {
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [route]);
};

export default useScrollTop;
