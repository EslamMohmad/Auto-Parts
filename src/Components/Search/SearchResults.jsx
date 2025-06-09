import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search_getSearchResults } from "../../Store/APIS";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "../../ReuseableComponents/Rating";
import { Link } from "react-router-dom";
import usePrevState from "../../Hooks/usePrevState";
import { waiting } from "../../Utils/Function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchResults = () => {
  const { searchState, searchResults } = useSelector(
    ({ SearchSlice }) => SearchSlice
  );
  const dispatch = useDispatch();

  const [state, setState] = useState(false);

  const prevState = usePrevState(searchState.value);

  useEffect(() => {
    if (searchState.state && searchState.value) {
      dispatch(search_getSearchResults(searchState.value));
    }
  }, [searchState.state, searchState.value, dispatch]);

  useEffect(() => {
    if (searchState.state) {
      if (searchState.value !== prevState) {
        setState(true);
        waiting(1000).then(() => setState(false));
      }
    }
  }, [searchState.value, prevState]);

  return state ? (
    <div className="h-[100px] leading-[100px] text-center">
      <FontAwesomeIcon
        icon="fa-solid fa-gear"
        className="animate-spin"
        size="xl"
      />
    </div>
  ) : (
    <div className="my-4">
      {searchState.state && searchResults.length ? (
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            460: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          spaceBetween={30}
        >
          {searchResults.map((product, index) => (
            <SwiperSlide key={product.id + index}>
              <Link
                to={`shop/${product.categorie[0]}/${product.heading}`}
                className="p-2 border border-gray-300 rounded-xl mb-2 hover:border-red-600 active:border-red-600 transition-colors hover:border block"
              >
                <img
                  src={product.imgs[0]}
                  className="w-full max-h-[300px] object-cover"
                />
              </Link>
              <Link
                to={`shop/${product.categorie[0]}/${product.heading}`}
                className="block whitespace-nowrap overflow-hidden text-ellipsis mb-2 hover:text-red-600 active:text-red-600 transition-colors text-sm font-semibold text-gray-800"
              >
                {product.heading}
              </Link>
              <div className="text-xs flex justify-between">
                <span>
                  {product.price.before} - {product.price.after}
                </span>
                <Rating rating={product.rating} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        "no data to show"
      )}
    </div>
  );
};

export default SearchResults;
