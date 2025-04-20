import { Link, Outlet, useLocation } from "react-router-dom";
import background from "../Assets/Shop/background.webp";
import { Fragment } from "react";

const ParentComponent = () => {
  const { pathname } = useLocation();

  const dynamicLinksArray = decodeURIComponent(pathname)
    .replace("/Auto-Parts", "home")
    .split("/");

  const linksHandler = (link) => {
    let result = "";
    switch (link) {
      case "home":
        result = "..";
        break;
      case "shop":
        result = "../shop";
        break;
      case "cart":
        result = "../cart";
        break;
    }
    return result;
  };

  return (
    <>
      <div className="relative h-[400px] left-0 flex justify-center items-center">
        <div className="relative z-[1]">
          <h3 className="text-4xl font-bold mb-3 text-center">
            {dynamicLinksArray[dynamicLinksArray.length - 1]}
          </h3>
          <ul className="flex justify-center">
            {dynamicLinksArray.map((li, index) => {
              const slah = <span className="mx-2">/</span>;
              return (
                <Fragment key={li}>
                  {dynamicLinksArray.length - 1 !== index ? (
                    <>
                      <Link
                        to={linksHandler(li)}
                        className="hover:text-red-500 active:text-red-500 transition-colors"
                      >
                        {li}
                      </Link>
                      {slah}
                    </>
                  ) : (
                    <>
                      <span className="mx-2">{li}</span>
                    </>
                  )}
                </Fragment>
              );
            })}
          </ul>
        </div>
        <div className="absolute left-auto w-[100vw] h-full ">
          <img src={background} className="h-full w-full object-cover" />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ParentComponent;
