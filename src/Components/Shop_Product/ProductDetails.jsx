import { useState } from "react";
import LoadingText from "../../ReuseableComponents/LoadingText";
import BuyItNowButton from "../../ReuseableComponents/BuyItNowButton";
import ProductMap from "../../ReuseableComponents/ProductMap";
import Rating from "../../ReuseableComponents/Rating";
import AddToCartButton from "../../ReuseableComponents/AddToCartButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Payment_Imgs from "../../ReuseableComponents/Payment_Imgs";
import ProductSize from "./../../ReuseableComponents/ProductSize";
import ProductAmount from "../../ReuseableComponents/ProductAmount";
import AddToWishlist from "../../ReuseableComponents/AddToWishlist";

const ProductDetails = ({ details, loadingState }) => {
  const [size, setSize] = useState({ value: "", price: "", stock: "" });

  const [amount, setAmount] = useState(1);

  const options = [
    { icon: "fa-solid fa-arrow-right-arrow-left", text: "compare" },
    { icon: "fa-solid fa-question", text: "ask a question" },
    { icon: "fa-solid fa-share-nodes", text: "social share" },
  ];

  return (
    <div className="flex flex-col gap-5 md:px-4 lg:px-8">
      <LoadingText height={"29px"} width={"100%"} loadingState={loadingState}>
        <h1 className="text-xl font-bold">{details?.heading}</h1>
      </LoadingText>
      <LoadingText height={"16px"} width={"20%"} loadingState={loadingState}>
        <Rating rating={details?.rating} />
      </LoadingText>
      <LoadingText height={"23px"} width={"50%"} loadingState={loadingState}>
        <h1 className="text-3xl font-bold">
          <span>{details?.price?.after}</span>
          <span className="mx-3">-</span>
          <span>{details?.price?.before}</span>
        </h1>
      </LoadingText>
      <LoadingText loadingState={loadingState} height={"29px"}>
        <p className="text-black/40 text-[12px] my-5">{details?.text}</p>
      </LoadingText>
      {typeof details?.size?.value !== "string" && (
        <ProductSize details={details?.size} setSize={setSize} size={size} />
      )}
      <div className="flex gap-2 flex-wrap">
        <ProductAmount amount={amount} setAmount={setAmount} />
        <AddToCartButton product={details} amount={amount} size={size} />
        <AddToWishlist
          product={details}
          methodname="wishlist"
          clickable={true}
          className={`w-[50px] h-[50px] leading-[50px] rounded-3xl uppercase text-[12px] bg-black/10 text-black cursor-pointer hover:bg-black hover:text-white transition-colors text-center ${`cursor-pointer hover:bg-red-500 hover:text-white ${
            loadingState.state && loadingState.method === "wishlist"
              ? "bg-red-500 border-transparent"
              : ""
          } active:bg-red-500 active:text-white transition-colors`}`}
        >
          <FontAwesomeIcon icon="fa-solid fa-heart" />
        </AddToWishlist>
        <BuyItNowButton product={details} amount={amount} size={size} />
      </div>
      <ul className="flex gap-6 lg:gap-8 py-5 flex-wrap">
        {options.map((option) => (
          <li key={option.text}>
            <button className="text-black/60 text-[13px] cursor-pointer hover:text-red-600 active:text-red-600 transition-colors">
              <FontAwesomeIcon icon={option.icon} className="mr-3" />
              <span>{option.text}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="bg-black/10 py-4 px-5 rounded-xl flex flex-col items-center gap-3">
        <h4 className="text-[12px] text-center">
          guarantee safe & secure checkout
        </h4>
        <Payment_Imgs />
      </div>
      <div className="text-black/50 text-[13px] capitalize flex flex-col gap-3 py-2">
        <div>
          <FontAwesomeIcon icon="fa-regular fa-clock" className="mr-4" />
          <span className="text-black/80 text-[14px]">estimated delivery</span>
          <span> : </span>
          <span>21 - 26 apr, 2025</span>
        </div>
        <div>
          <FontAwesomeIcon icon="fa-solid fa-truck-fast" className="mr-4" />
          <span className="text-black/80 text-[14px]">
            free shipping & returns
          </span>
          <span> : </span>
          <span>on all order over $200.00</span>
        </div>
      </div>
      <LoadingText height={"29px"} width={"50%"} loadingState={loadingState}>
        <ProductMap product={details} />
      </LoadingText>
    </div>
  );
};

export default ProductDetails;
