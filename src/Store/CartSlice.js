import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    products: [],
    shippingType: [
      { type: "flat rate", price: 70, state: true },
      { type: "local pickup", price: 30, state: false },
    ],
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
    setShippingType: (state, { payload }) => {
      state.shippingType = state.shippingType.map((shipping) =>
        shipping.type === payload.type
          ? { ...shipping, state: true }
          : { ...shipping, state: false }
      );
    },
  },
});

export const { addProductToCart, removeProductFromCart, setShippingType } =
  CartSlice.actions;

export default CartSlice.reducer;
