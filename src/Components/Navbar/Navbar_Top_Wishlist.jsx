import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar_Top_Wishlist = () => {
  return (
    <div className="relative hover:text-red-600 active:text-red-600 cursor-pointer transition-colors hidden sm:block">
      <FontAwesomeIcon icon="fa-regular fa-heart" size="xl" />
      <span className="absolute -right-3 -top-3 text-white bg-red-600 rounded-full w-[17px] h-[17px] leading-[17px] text-[8px] text-center">
        0
      </span>
    </div>
  );
};

export default Navbar_Top_Wishlist;
