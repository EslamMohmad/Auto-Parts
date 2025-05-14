import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useNavToHome = (products) => {
  const { pathname } = useLocation();

  const navTo = useNavigate();

  useEffect(() => {
    if (!products.length) {
      navTo("../");
    }
  }, [pathname, products.length]);
};

export default useNavToHome;
