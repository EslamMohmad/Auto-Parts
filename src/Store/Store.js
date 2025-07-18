import { configureStore } from "@reduxjs/toolkit";
import PortalSlice from "./PortalSlice";
import CartSlice from "./CartSlice";
import ProductsSlice from "./ProductsSlice";
import AuthSlice from "./AuthSlice";
import SearchSlice from "./SearchSlice";

export const Store = configureStore({
  reducer: { PortalSlice, CartSlice, ProductsSlice, AuthSlice, SearchSlice },
});
