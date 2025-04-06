import { useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../Firebase/Firebase";

const useGetProducts = (type) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const myRef = child(ref(database), `Auto-Parts/${type}`);
    get(myRef).then((res) => setProducts(res.val()));
  }, [type]);

  return products;
};

export default useGetProducts;
