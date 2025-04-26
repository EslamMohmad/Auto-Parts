import { Link } from "react-router-dom";

const Shop_Now_Button = ({ link }) => {
  return (
    <Link
      to={link}
      className="bg-white py-3 px-7 rounded-3xl text-[11px] uppercase outline-none cursor-pointer hover:bg-red-500 active:bg-red-500 hover:text-white active:text-white transition-colors"
    >
      shop now
    </Link>
  );
};

export default Shop_Now_Button;
