import { useEffect, useState } from "react";

const useLoading = (time) => {
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    let timer;
    if (loadingState) {
      timer = setTimeout(() => {
        setLoadingState(false);
      }, time || 1000);
    }
    return () => clearTimeout(timer);
  }, [loadingState]);

  return { loadingState, setLoadingState };
};

export default useLoading;
