import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import background from "../Assets/Shop/background.webp";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import usePrevState from "../Hooks/usePrevState";

const ParentComponent = () => {
  const { userData } = useSelector(({ AuthSlice }) => AuthSlice);
  const { products } = useSelector(({ CartSlice }) => CartSlice);

  const { pathname } = useLocation();

  const navTo = useNavigate();

  const prevRoute = usePrevState(pathname);

  const dynamicLinksArray = decodeURIComponent(pathname)
    .replace("/Auto-Parts", "home")
    .split("/");

  const linksHandler = (link) => {
    let result = "";
    switch (link) {
      case "home":
        result = "..";
        break;
      default:
        result = `../${link}`;
        break;
    }
    return result;
  };

  useEffect(() => {
    if (pathname.includes("my-account") && !userData?.email) {
      navTo("../");
    }
  }, [pathname, userData?.email]);

  useEffect(() => {
    // navto home page after ordering
    if ((prevRoute?.includes("orders") || !prevRoute) && !products.length) {
      navTo("../");
    }
  }, [pathname]);

  return (
    <>
      <div className="relative h-[400px] left-0 flex justify-center items-center">
        <div className="relative z-[1]">
          <h3 className="text-4xl font-bold mb-3 text-center uppercase">
            {dynamicLinksArray[dynamicLinksArray.length - 1].replace("-", " ")}
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
                        className="hover:text-red-500 active:text-red-500 transition-colors capitalize"
                      >
                        {li.replace("-", " ")}
                      </Link>
                      {slah}
                    </>
                  ) : (
                    <>
                      <span className="mx-2 capitalize">
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
