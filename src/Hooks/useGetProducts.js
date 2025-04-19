import { useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../Firebase/Firebase";

const useGetProducts = (type, isLoading) => {
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState(isLoading || false);

  useEffect(() => {
    let time;
    const delay = 1000;

    if (loadingState) {
      time = setTimeout(() => {
        setLoadingState(false);
      }, delay);
      const myRef = child(ref(database), `Auto-Parts/${type}`);
      get(myRef).then((res) => setProducts(res.val()));
    }

    return () => clearTimeout(time);
  }, [type, loadingState]);

  return { products, loadingState, setLoadingState };
};

export default useGetProducts;
