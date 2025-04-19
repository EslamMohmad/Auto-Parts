import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Process_Button from "./Process_Button";
import { useSelector } from "react-redux";

const AddToWishlist = () => {
  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  return (
    <Process_Button
      className={`w-[50px] h-[50px] leading-[50px] rounded-3xl uppercase text-[12px] bg-black/10 text-black cursor-pointer hover:bg-black hover:text-white transition-colors text-center ${`cursor-pointer hover:bg-red-500 hover:text-white ${
        loadingState.state && loadingState.method === "wishlist"
          ? "bg-red-500 border-transparent"
          : ""
      } active:bg-red-500 active:text-white transition-colors`}`}
      methodname="wishlist"
      clickable={true}
    >
      <FontAwesomeIcon icon="fa-solid fa-heart" />
    </Process_Button>
  );
};

export default AddToWishlist;
