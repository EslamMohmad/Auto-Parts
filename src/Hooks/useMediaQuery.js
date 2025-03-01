import { useState, useEffect } from "react";
const useMediaQuery = (media) => {
  const [state, setState] = useState(false);

  const query = window.matchMedia(media);

  useEffect(() => {
    const mediaState = () => setState(() => query.matches);

    mediaState();

    query.addEventListener("change", mediaState);

    return () => query.removeEventListener("change", mediaState);
  }, [state, query.matches]);

  return state;
};

export default useMediaQuery;
