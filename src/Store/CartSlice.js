import { createSlice } from "@reduxjs/toolkit";
import { checkout_createOrder } from "./APIS";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    loadingState: false,
    couponCode: "",
    products: [],
    currentOrders: {},
    shippingType: [
      { type: "flat rate", price: 70, state: true },
      { type: "local pickup", price: 30, state: false },
    ],
    paymentType: [
      { type: "direct bank transfer", state: true },
      { type: "check payments", state: false },
      { type: "cash on delivery", state: false },
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
    setPaymentType: (state, { payload }) => {
      state.paymentType = state.paymentType.map((payment) =>
        payment.type === payload.type
          ? { ...payment, state: true }
          : { ...payment, state: false }
      );
    },
    setCouponCode: (state, { payload }) => {
      state.couponCode = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkout_createOrder.pending, (state) => {
      state.loadingState = true;
    }),
      builder.addCase(checkout_createOrder.fulfilled, (state, payload) => {
        state.loadingState = false;
        state.currentOrders = payload.meta.arg;
        state.products = [];
      });
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  setShippingType,
  setPaymentType,
  setCouponCode,
} = CartSlice.actions;

export default CartSlice.reducer;
