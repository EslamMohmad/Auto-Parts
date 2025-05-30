import { Link, Outlet, useLocation } from "react-router-dom";
import background from "../Assets/Shop/background.webp";
import { Fragment } from "react";

const ParentComponent = () => {
  const { pathname } = useLocation();

  const dynamicLinksArray = decodeURIComponent(pathname)
    .replace("/Auto-Parts", "home")
    .split("/");

  const linksHandler = () => {
    let result = [];

    dynamicLinksArray.map(
      (link, i) =>
        i < dynamicLinksArray.length - 1 &&
        result.push(
          `${
            i >= 1
              ? `${i !== 1 ? dynamicLinksArray[1] + "/" : ""}` + link
              : "/Auto-Parts"
          }`
        )
    );

    return result;
  };

  return (
    <>
      <div className="relative h-[400px] left-0 flex justify-center items-center">
        <div className="relative z-[1]">
          <h3 className="text-4xl font-bold mb-3 text-center uppercase">
            {dynamicLinksArray[dynamicLinksArray.length - 1].replace("-", " ")}
          </h3>
          <ul className="flex justify-center flex-wrap sm:flex-nowrap">
            {dynamicLinksArray.map((li, index) => {
              const slah = <span className="mx-2">/</span>;
              return (
                <Fragment key={li}>
                  {dynamicLinksArray.length - 1 !== index ? (
                    <>
                      <Link
                        to={linksHandler()[index]}
                        className="hover:text-red-500 active:text-red-500 transition-colors capitalize overflow-hidden text-ellipsis whitespace-nowrap min-w-[20px]"
                      >
                        {li.replace("-", " ")}
                      </Link>
                      {slah}
                    </>
                  ) : (
                    <>
                      <span className="mx-2 capitalize overflow-hidden text-ellipsis whitespace-nowrap min-w-[20px]">
                        {li.replace("-", " ")}
                      </span>
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
