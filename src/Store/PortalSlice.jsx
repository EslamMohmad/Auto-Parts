import { createSlice } from "@reduxjs/toolkit";

const PortalSlice = createSlice({
  name: "PortalSlice",
  initialState: {
    overlayState: false,
    cartMenuState: false,
    mainMenuState: false,
  },
  reducers: {
    closeOverlay: (state) => {
      for (let key in state) {
        state[key] = false;
      }
    },
    toggleMainMenu: (state, { payload }) => {
      state.overlayState = payload;
      state.mainMenuState = payload;
    },
    toggleCartMenu: (state, { payload }) => {
      state.overlayState = payload;
      state.cartMenuState = payload;
    },
  },
});

export const { toggleMainMenu, toggleCartMenu, closeOverlay } =
  PortalSlice.actions;

export default PortalSlice.reducer;
