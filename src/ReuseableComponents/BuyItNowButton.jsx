import { useSelector } from "react-redux";
import Process_Button from "./Process_Button";

const BuyItNowButton = ({ size, product }) => {
  const { loadingState } = useSelector(({ PortalSlice }) => PortalSlice);

  return (
    <Process_Button
      className={`py-3.5 px-10 rounded-3xl w-auto sm:w-full grow uppercase text-[12px] bg-black text-white text-center ${
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
    >
      buy it now
    </Process_Button>
  );
};

export default BuyItNowButton;
