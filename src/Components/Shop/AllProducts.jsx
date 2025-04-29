import { useState } from "react";
import LoadingProduct from "../../ReuseableComponents/LoadingProduct";
import Product from "../../ReuseableComponents/Product";
import LayoutOptions from "./LayoutOptions";
import Process_Button from "../../ReuseableComponents/Process_Button";
import { useSelector } from "react-redux";
import Filtering from "./Filtering";
import { setProductsAmount } from "../../Store/ProductsSlice";
import useMediaQuery from "../../Hooks/useMediaQuery";
import FilterByButton from "./FilterByButton";

const AllProducts = ({ products, loadingState, allProducts }) => {
  const { loadingState: loading } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );

  const lessDesktop = useMediaQuery("(max-width : 1024px)");
  const isMobile = useMediaQuery("(max-width : 640px)");

  const columnsStyle = [
    {
      columns: 4,
      style: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    },
    { columns: 3, style: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" },
    { columns: 2, style: "grid-cols-1 sm:grid-cols-2 " },
  ];

  const [columns, setColumns] = useState(4);

  return (
    <section className="py-10 flex flex-col lg:flex-row gap-5">
      {!lessDesktop ? (
        <div className="lg:block grow min-w-[400px]">
          <Filtering />
        </div>
      ) : (
        !isMobile && <FilterByButton />
      )}
      <div className="lg:w-3/4">
        <LayoutOptions
          setColumns={setColumns}
          currLength={products.length}
          allProducts={allProducts}
          isMobile={isMobile}
        />
        <div
          className={`grid ${
            columnsStyle.filter((object) => object.columns === columns)[0].style
          } gap-3 py-10 transition-all`}
        >
          {products?.map((product, index) => (
            <div key={index} className="relative">
              <Product details={product} index={index} currentSlide={index} />
              <LoadingProduct state={loadingState} />
            </div>
          ))}
        </div>
        {products.length < allProducts && (
          <Process_Button
            className={`relative h-[40px] leading-[40px] px-6 w-fit rounded-sm text-[12px] cursor-pointer mx-auto ${
              loading.state && loading.method === "load more items"
                ? "bg-red-500 border-transparent"
                : "bg-black/15 hover:bg-red-600 hover:text-white"
            }`}
            clickable={true}
            methodname="load more items"
            afterloading={[setProductsAmount(5)]}
          >
            load more items
          </Process_Button>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
