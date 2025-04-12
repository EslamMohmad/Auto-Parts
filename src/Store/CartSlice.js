import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart: (state, { payload }) => {
      const modifyObject = {
        ...payload,
        id: state.products.length,
      };

      if (!state.products.length) {
        const result = [];
        result.push(modifyObject);
        state.products = result;
      } else {
        const existProduct = state.products.findIndex(
          (product) => product?.heading === payload?.heading
        );

        if (existProduct !== -1) {
          state.products = state.products.map((product) => {
            if (product?.heading === payload?.heading) {
              return {
                ...product,
                amount: +product?.amount + +payload?.amount,
                id: state.products.length,
              };
            } else return product;
          });
        } else state.products = [...state.products, modifyObject];
      }
    },
    removeProductFromCart: (state, { payload: id }) => {
      state.products = state.products.filter((product) => product.id !== id);
    },
  },
});

export const { addProductToCart, removeProductFromCart } = CartSlice.actions;

export default CartSlice.reducer;
