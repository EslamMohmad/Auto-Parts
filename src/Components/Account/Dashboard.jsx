import { Link } from "react-router-dom";

const Dashboard = ({ details }) => {
  return (
    <article>
      <h1 className="text-xl font-semibold p-3 bg-black/10 rounded-xl">
        dashboard
      </h1>
      <div className="my-3 text-sm pl-3">
        <h4>
          <span className="text-black/70">hello </span>
          {details.displayName}
        </h4>
        <p className="mt-3 text-black/60 w-[80%]">
          From your account dashboard you can view your{" "}
          <Link
            to={"orders"}
            className="text-black hover:text-red-600 active:text-red-600"
          >
            recent orders
          </Link>
          ,{" "}
          <Link
            to="account-details"
            className="text-black hover:text-red-600 active:text-red-600"
          >
            manage your account
          </Link>
          , and check list of{" "}
          <Link
            to="wishlist"
            className="text-black hover:text-red-600 active:text-red-600"
          >
            wishlist
          </Link>
          .
        </p>
      </div>
    </article>
  );
};

export default Dashboard;
