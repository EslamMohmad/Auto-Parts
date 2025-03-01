import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar_Mobile_Bottom = () => {
  const navigation = [
    { name: "home", path: "", icon: "fa-solid fa-house" },
    { name: "shopping", path: "shop", icon: "fa-solid fa-shop" },
    { name: "wishlist", path: "wishlist", icon: "fa-regular fa-heart" },
    { name: "account", path: "account", icon: "fa-regular fa-user" },
  ];

  return (
    <nav className="fixed bottom-0 w-full shadow-[0_-5px_55px] shadow-black/25 transition-none bg-white">
      <ul className="flex">
        {navigation.map(({ name, path, icon }) => (
          <li
            key={name}
            className="w-1/4 border-r not-last-of-type:border-r border-gray-200 group"
          >
            <Link
              to={path}
              className="py-3 flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon
                icon={icon}
                className="group-hover:text-red-500"
              />
              <span className="text-[10px] text-gray-600 mt-2">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar_Mobile_Bottom;
