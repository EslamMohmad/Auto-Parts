import { createSlice } from "@reduxjs/toolkit";
import { checkout_createOrder } from "./APIS";

const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState: {
    loadingState: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(checkout_createOrder.pending, (state) => {
      state.loadingState = true;
    }),
      builder.addCase(checkout_createOrder.fulfilled, (state, { payload }) => {
        state.loadingState = false;
        console.log(payload);
      });
  },
});

export default OrderSlice.reducer;
