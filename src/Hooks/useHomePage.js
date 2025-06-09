import { useLocation } from "react-router-dom";

const useHomePage = () => {
  const { pathname } = useLocation();

  return pathname === "/Auto-Parts" || pathname === "/Auto-Parts/"
    ? true
    : false;
};

export default useHomePage;
