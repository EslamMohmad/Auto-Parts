import { Link, useLocation } from "react-router-dom";
import background from "../Assets/Shop/background.webp";

const Shop_Component = () => {
  const { pathname } = useLocation();

  const navigationHandler = pathname.replace("/Auto-Parts/", "").split("/");

  return (
    <section>
      <div className="relative h-[75vh]">
        <div className="absolute w-full h-1/2 left-0">
          <img src={background} className="h-full w-full" />
        </div>
        <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit">
          <h1 className="text-3xl font-bold">
            {navigationHandler[navigationHandler.length - 1]}
          </h1>
          <ul className="flex gap-3">
            <li>
              <Link to="..">
                home <span className="ml-3">/</span>{" "}
              </Link>
            </li>
            {navigationHandler.map((link, idx, arr) => (
              <li key={link}>
                <Link to={`../${link}`}>{link}</Link>
                <span className="ml-3">
                  {navigationHandler.length - 1 === idx ? "" : "/"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Shop_Component;
