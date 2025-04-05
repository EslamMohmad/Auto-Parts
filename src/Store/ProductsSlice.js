import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
  name: "ProductsSlice",
  initialState: {
    productQuickView: {},
  },
  reducers: {
    addProductToQuickView: (state, { payload }) => {
      state.productQuickView = payload;
    },
  },
});

export const { addProductToQuickView } = ProductsSlice.actions;

export default ProductsSlice.reducer;
