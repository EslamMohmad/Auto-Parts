import { useParams } from "react-router-dom";
import useGetProducts from "../../Hooks/useGetProducts";
import ProductsComponent from "../../ReuseableComponents/ProductsComponent";

const RelatedProducts = () => {
  const { products: relatedProducts, loadingState: relatedloadingState } =
    useGetProducts("", true);

  const { category } = useParams();

  return (
    <ProductsComponent
      heading="related products"
      loadingState={relatedloadingState}
      products={relatedProducts[category]}
      firstBtnIcon={true}
    />
  );
};

export default RelatedProducts;
