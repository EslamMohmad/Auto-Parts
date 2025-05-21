import { memo } from "react";

const LoadingText = ({ children, width, height, loadingState }) => {
  return !loadingState ? (
    children
  ) : (
    <div
      className={`relative bg-black/15 rounded-md animate-pulse h-[${
        height || "auto"
      }] w-[${width || "100%"}] `}
      style={{ height, width }}
    ></div>
  );
};

export default memo(LoadingText);
