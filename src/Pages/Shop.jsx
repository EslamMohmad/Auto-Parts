import { useLocation, useParams } from "react-router-dom";
import Categories from "../Components/Shop/Categories";
import AllProducts from "../Components/Shop/AllProducts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shop_getProducts } from "../Store/APIS";

const Shop = () => {
  const { shopPageProducts, categories, productsLength, loadingState } =
    useSelector(({ ProductsSlice }) => ProductsSlice);

  const { pathname } = useLocation();

  const action = useDispatch();

  const { category } = useParams();

  const currentProducts = shopPageProducts.slice(0, productsLength);

  useEffect(() => {
    action(shop_getProducts(category || ""));
  }, [shopPageProducts.length, category]);

  return (
    <>
      {pathname === "/Auto-Parts/shop" && (
        <Categories categories={categories} />
      )}

      <AllProducts
        products={currentProducts}
        loadingState={loadingState}
        allProducts={shopPageProducts.length}
      />
    </>
  );
};
export default Shop;
