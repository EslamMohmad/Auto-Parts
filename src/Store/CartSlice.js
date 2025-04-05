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
      state.products = state.products.filter((product) => product.id !== id);
    },
  },
});

export const { addProductToCart, removeProductFromCart } = CartSlice.actions;

export default CartSlice.reducer;
