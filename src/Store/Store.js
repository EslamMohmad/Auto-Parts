import { configureStore } from "@reduxjs/toolkit";
import PortalSlice from "./PortalSlice";
import CartSlice from "./CartSlice";

export const Store = configureStore({
  reducer: { PortalSlice, CartSlice },
});
