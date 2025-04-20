import { useLocation } from "react-router-dom";
import Categories from "../Components/Shop/Categories";
import useGetProducts from "../Hooks/useGetProducts";

const Shop = () => {
  const { products, loadingState } = useGetProducts("", true);
  const { pathname } = useLocation();

  const categories = Object.keys(products).map((category) => ({
    name: category,
    productsAmount: products[category].length,
  }));

  return (
    <>
      {pathname === "/Auto-Parts/shop" && (
        <Categories categories={categories} />
      )}
    </>
  );
};
export default Shop;
