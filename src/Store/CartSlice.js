import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart: (state, { payload }) => {
      const modifyObject = {
        id: state.products.length,
        ...payload,
      };

      if (!state.products.length) {
        const result = [];
        result.push(modifyObject);
        state.products = result;
      } else {
        state.products = [...state.products, modifyObject];
      }
    },
    removeProductFromCart: (state, { payload: id }) => {
      const index = state.products.findIndex((product) => product.id === id);
      state.products = state.products.slice(0, index);
    },
  },
});

export const { addProductToCart, removeProductFromCart } = CartSlice.actions;

export default CartSlice.reducer;
