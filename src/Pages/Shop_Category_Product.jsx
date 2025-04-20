import { useParams } from "react-router-dom";
import useGetProducts from "../Hooks/useGetProducts";
import ProductSlider from "../Components/Shop_Product/ProductSlider";
import ProductDetails from "../Components/Shop_Product/ProductDetails";
import Navigattion from "../Components/Shop_Product/Navigattion";
import MoreInformation from "../Components/Shop_Product/MoreInformation";
import { useEffect } from "react";
import RelatedProducts from "../Components/Shop_Product/RelatedProducts";

const Shop_Category_Product = () => {
  const { category, product } = useParams();

  const { products, loadingState, setLoadingState } = useGetProducts(
    category,
    true
  );

  const details = products?.filter((object) => object?.heading === product)[0];

  useEffect(() => {
    !loadingState && setLoadingState(true);
  }, [product]);

  return (
    <section>
      <Navigattion category={category} />
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 min-h-[60vh] pb-10">
        <div className="md:w-1/2">
          <ProductSlider details={details} loadingState={loadingState} />
        </div>
        <div className="md:w-1/2">
          <ProductDetails details={details} loadingState={loadingState} />
        </div>
      </div>
      <MoreInformation />
      <RelatedProducts />
    </section>
  );
};

export default Shop_Category_Product;
