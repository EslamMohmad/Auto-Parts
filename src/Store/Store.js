import { configureStore } from "@reduxjs/toolkit";
import PortalSlice from "./PortalSlice";

export const Store = configureStore({
  reducer: { PortalSlice },
});
