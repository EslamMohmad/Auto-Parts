import { configureStore } from "@reduxjs/toolkit";
import PortalSlice from "./PortalSlice";
import CartSlice from "./CartSlice";
import ProductsSlice from "./ProductsSlice";

export const Store = configureStore({
  reducer: { PortalSlice, CartSlice, ProductsSlice },
});
