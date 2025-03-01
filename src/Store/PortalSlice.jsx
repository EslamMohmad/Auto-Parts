import { createSlice } from "@reduxjs/toolkit";

const PortalSlice = createSlice({
  name: "PortalSlice",
  initialState: {
    overlayState: false,
    cartMenuState: false,
    mainMenuState: false,
    searchMenuState: false,
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
      state.searchMenuState = false;
      state.cartMenuState = false;
    },
    toggleCartMenu: (state, { payload }) => {
      state.overlayState = payload;
      state.cartMenuState = payload;
      state.searchMenuState = false;
      state.mainMenuState = false;
    },
    toggleSearchMenu: (state, { payload }) => {
      state.overlayState = payload;
      state.searchMenuState = payload;
      state.cartMenuState = false;
      state.mainMenuState = false;
    },
  },
});

export const {
  closeOverlay,
  toggleMainMenu,
  toggleCartMenu,
  toggleSearchMenu,
} = PortalSlice.actions;

export default PortalSlice.reducer;
