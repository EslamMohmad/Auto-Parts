import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const ProductAmount = ({ amount, setAmount }) => {
  return (
    <div className="flex items-center bg-gray-200  rounded-3xl p-2 w-[max-content]">
      <button
        className="cursor-pointer hover:bg-white hover:text-red-500 active:bg-white active:text-red-500  transition-colors w-[30px] h-[30px] leading-[30px] text-center rounded-full"
        onClick={() => amount > 1 && setAmount((amount -= 1))}
      >
        <FontAwesomeIcon icon="fa-solid fa-minus" size="xs" />
      </button>
      <div className="px-8">{amount}</div>
      <button
        className="cursor-pointer hover:bg-white hover:text-red-500 active:bg-white active:text-red-500 transition-colors w-[30px] h-[30px] leading-[30px] text-center rounded-full"
        onClick={() => setAmount((amount += 1))}
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" size="xs" />
      </button>
    </div>
  );
};

export default memo(ProductAmount);
