import { createSlice } from "@reduxjs/toolkit";
import {
  shop_getCategories,
  shop_getProductDetails,
  shop_getProducts,
  wishlist_addProductToUserWishlist,
  wishlist_getProductUserWishlist,
} from "./APIS";

const ProductsSlice = createSlice({
  name: "ProductsSlice",
  initialState: {
    productQuickView: {},
    productDetails: {},
    shopPageProducts: [],
    filteredProducts: [],
    categories: [],
    productsLength: 10,
    loadingState: true,
    filterKeys: [],
    wishlistState: { message: "", productsLength: 0 },
    wishlistProducts: {},
  },
  reducers: {
    addProductToQuickView: (state, { payload }) => {
      state.productQuickView = payload;
    },
    setProductsAmount: (state, { payload }) => {
      state.productsLength =
        state.productsLength <= state.shopPageProducts.length
          ? state.productsLength + payload
          : state.shopPageProducts.length;
    },
    addKeysToFilter: (state, { payload }) => {
      if (payload.state) {
        state.filterKeys = [...state.filterKeys, payload.type];
      } else {
        state.filterKeys = state.filterKeys.filter(
          (key) => key !== payload.type
        );
      }
    },
    imgsLoading: (state, { payload }) => {
      state.loadingState = payload;
    },
    emptyWishList: (state) => {
      state.wishlistState = {
        message: "",
        productsLength: state.wishlistState.productsLength,
      };
    },
    emptyWishlistProducts: (state) => {
      state.wishlistProducts = {};
    },
  },
  extraReducers: (builder) => {
    //get shop products
    builder.addCase(shop_getProducts.pending, (state) => {
      // state.loadingState = true;
    }),
      builder.addCase(shop_getProducts.fulfilled, (state, { payload }) => {
        // state.loadingState = false;
        state.shopPageProducts = Object.values(payload).flat();
      });

    //get shop categories
    builder.addCase(shop_getCategories.pending, (state) => {
      state.loadingState = true;
    }),
      builder.addCase(shop_getCategories.fulfilled, (state, { payload }) => {
        state.loadingState = false;
        state.categories = Object.keys(payload).map((category) => ({
          name: category,
          productsAmount: payload[category].length,
        }));
      });

    //get product details
    builder.addCase(shop_getProductDetails.pending, (state) => {
      state.loadingState = true;
    }),
      builder.addCase(
        shop_getProductDetails.fulfilled,
        (state, { payload, meta: { arg } }) => {
          state.loadingState = false;
          state.productDetails = payload.filter(
            (object) => object?.heading === arg.product
          )[0];
        }
      );

    //set product to user wishlist

    builder.addCase(
      wishlist_addProductToUserWishlist.fulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.wishlistState = payload;
      }
    );
    builder.addCase(
      wishlist_getProductUserWishlist.fulfilled,
      (state, { payload }) => {
        state.wishlistProducts = payload;
      }
    );
  },
});

export const {
  addProductToQuickView,
  setProductsAmount,
  addKeysToFilter,
  imgsLoading,
  emptyWishList,
  emptyWishlistProducts,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
