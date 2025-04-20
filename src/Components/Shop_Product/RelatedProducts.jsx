import useGetProducts from "../../Hooks/useGetProducts";
import ProductsComponent from "../../ReuseableComponents/ProductsComponent";

const RelatedProducts = () => {
  const { products: relatedProducts, loadingState: relatedloadingState } =
    useGetProducts("", true);

  const modifyProducts = Object.values(relatedProducts)?.flat();

  return (
    <ProductsComponent
      heading="related products"
      loadingState={relatedloadingState}
      products={modifyProducts}
    />
  );
};

export default RelatedProducts;
