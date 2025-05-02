import { useSelector } from "react-redux";
import Process_Button from "./Process_Button";
import { useNavigate } from "react-router-dom";

const BuyItNowButton = ({ size, product }) => {
  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  const navTo = useNavigate();

  return (
    <Process_Button
      className={`py-3.5 px-10 rounded-3xl w-auto sm:w-full grow lg:grow-0 uppercase text-[12px] bg-black text-white text-center ${
        size.value || !product?.size?.value
          ? `cursor-pointer hover:bg-red-500 hover:text-white ${
              loadingState.state && loadingState.method === "buy it now"
                ? "bg-red-500 border-transparent"
                : ""
            } active:bg-red-500 active:text-white transition-colors`
          : "cursor-not-allowed"
      }`}
      disabled={!size.value || product?.size?.value}
      methodname="buy it now"
      clickable={size.value || !product?.size?.value}
      outermethod={() => navTo("../checkout")}
    >
      buy it now
    </Process_Button>
  );
};

export default BuyItNowButton;
