import { useLocation, useParams } from "react-router-dom";
import Categories from "../Components/Shop/Categories";
import AllProducts from "../Components/Shop/AllProducts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shop_getProducts } from "../Store/APIS";

const Shop = () => {
  const {
    shopPageProducts,
    categories,
    productsLength,
    loadingState,
    filterKeys,
  } = useSelector(({ ProductsSlice }) => ProductsSlice);

  const { pathname } = useLocation();

  const action = useDispatch();

  const { category } = useParams();

  const productsFilterHandler = () => {
    if (!filterKeys.length) return shopPageProducts;

    return shopPageProducts.filter(
      (product) =>
        filterKeys.includes(product.categorie[0]) ||
        filterKeys.includes(product.brands)
    );
  };

  useEffect(() => {
    action(shop_getProducts(category || ""));
  }, [category]);

  return (
    <>
      {pathname === "/Auto-Parts/shop" && (
        <Categories categories={categories} />
      )}

      <AllProducts
        products={productsFilterHandler().slice(0, productsLength)}
        loadingState={loadingState}
        allProducts={productsFilterHandler().length}
      />
    </>
  );
};
export default Shop;
