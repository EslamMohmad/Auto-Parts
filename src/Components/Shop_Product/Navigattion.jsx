import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigattion = ({ category }) => {
  const { pathname } = useLocation();

  const dynamicLinksArray = decodeURIComponent(pathname)
    .replace("/Auto-Parts", "home")
    .split("/");

  const staticLinksArray = ["home", "shop", "category", "product"];

  const linksHandler = (link) => {
    let result = "";
    switch (link) {
      case "home":
        result = "..";
        break;
      case "shop":
        result = "../shop";
        break;
      case "category":
        result = `../shop/${category}`;
        break;
    }
    return result;
  };

  return (
    <ul className="flex py-8 items-center gap-3 text-[12px] text-black/60">
      {staticLinksArray.map((link, index) => (
        <Fragment key={`${index}`}>
          <li className="overflow-hidden text-ellipsis whitespace-nowrap min-w-[35px]">
            {staticLinksArray.length - 1 !== index ? (
              <Link
                to={linksHandler(link)}
                className="hover:text-red-600 active:text-red-600 transition-colors"
              >
                {dynamicLinksArray[index]}
              </Link>
            ) : (
              dynamicLinksArray[index]
            )}
          </li>
          {staticLinksArray.length - 1 !== index && (
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="xs" />
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default Navigattion;
