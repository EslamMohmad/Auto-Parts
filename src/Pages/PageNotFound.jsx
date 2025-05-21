import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-[60vh] justify-center items-center flex-col gap-4">
      <h1 className="text-3xl md:text-9xl font-bold">404</h1>
      <p className="text-xl uppercase font-bold">page not found</p>
      <Link
        to=".."
        className="py-3 px-5 rounded-md bg-black hover:bg-red-600 text-white transition-colors uppercase cursor-pointer text-xs"
      >
        go to shopping
      </Link>
    </div>
  );
};

export default PageNotFound;
