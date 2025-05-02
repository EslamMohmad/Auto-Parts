import { useEffect, useState } from "react";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetProducts from "../../Hooks/useGetProducts";
import ProductsComponent from "../../ReuseableComponents/ProductsComponent";

const FilterProductsRow = ({
  setLoadingState,
  selectedItems,
  selectedItemsHandler,
}) => {
  return (
    <ul className="md:w-[max-content] lg:w-auto whitespace-nowrap">
      {selectedItems.map(({ itemsType, selected }) => (
        <li
          key={itemsType}
          className={`inline-block not-last-of-type:mr-5 py-1 px-5 cursor-pointer rounded-2xl transition-colors text-sm ${
            selected
              ? "text-red-600 bg-gray-300/50"
              : "text-black/25 hover:text-red-600 hover:bg-gray-300/50"
          }`}
          onClick={() =>
            !selected &&
            (selectedItemsHandler(itemsType), setLoadingState(true))
          }
        >
          {itemsType}
        </li>
      ))}
    </ul>
  );
};

const FilterProductsList = ({
  loadingState,
  setLoadingState,
  selectedItems,
  selectedItemsHandler,
}) => {
  const [listState, setListState] = useState(false);

  return (
    <div className="relative w-full">
      <button
        className="uppercase text-sm bg-gray-200 w-full py-3 rounded-md text-black/50 flex justify-center"
        onClick={() => setListState(!listState)}
      >
        <span className="ml-auto">
          {selectedItems.find((object) => object.selected).itemsType}
        </span>
        <span className="ml-auto mr-3">
          {listState ? (
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" size="sm" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="sm" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {listState && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="absolute z-[1] w-full bg-white shadow-bottom overflow-hidden"
          >
            {selectedItems.map(({ itemsType, selected }) => (
              <li
                key={itemsType}
                className={`block w-full text-center py-3 px-5 cursor-pointer rounded-2xl transition-colors text-sm ${
                  selected
                    ? "text-red-600"
                    : "text-black/25 hover:text-red-600 active:text-red-600"
                }`}
                onClick={() => (
                  !selected &&
                    (selectedItemsHandler(itemsType), setLoadingState(true)),
                  !loadingState && setListState(false)
                )}
              >
                {itemsType}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterListComponent = ({
  loadingState,
  selectedItems,
  setLoadingState,
  setSelectedItems,
}) => {
  const isMobile = useMediaQuery("(max-width : 640px)");

  const selectedItemsHandler = (text) => {
    const result = selectedItems.map((object) => {
      if (object.itemsType === text) {
        return { itemsType: text, selected: true };
      }
      for (const key in object) {
        return { itemsType: object[key], selected: false };
      }
    });
    setSelectedItems(result);
  };

  return isMobile ? (
    <FilterProductsList
      setLoadingState={setLoadingState}
      selectedItems={selectedItems}
      selectedItemsHandler={selectedItemsHandler}
    />
  ) : (
    <FilterProductsRow
      loadingState={loadingState}
      setLoadingState={setLoadingState}
      selectedItems={selectedItems}
      selectedItemsHandler={selectedItemsHandler}
    />
  );
};

const FeaturedProducts = () => {
  const [selectedItems, setSelectedItems] = useState([
    { itemsType: "Accessories", selected: true },
    { itemsType: "Headlights", selected: false },
    { itemsType: "Automotive Rims", selected: false },
  ]);

  const { products, loadingState, setLoadingState } = useGetProducts(
    selectedItems.find((object) => object.selected).itemsType
  );

  useEffect(() => {
    !products.length && !loadingState && setLoadingState(true);
  }, [loadingState]);

  return (
    <motion.section
      initial={{ opacity: 0, y: "300px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ".5" }}
      viewport={{ margin: "-100px", once: true }}
    >
      <ProductsComponent
        heading="featured products"
        loadingState={loadingState}
        products={products}
        firstBtnIcon={true}
        filterListComponent={
          <FilterListComponent
            loadingState={loadingState}
            selectedItems={selectedItems}
            setLoadingState={setLoadingState}
            setSelectedItems={setSelectedItems}
          />
        }
      />
    </motion.section>
  );
};

export default FeaturedProducts;
