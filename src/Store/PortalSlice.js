import { createSlice } from "@reduxjs/toolkit";

const PortalSlice = createSlice({
  name: "PortalSlice",
  initialState: {
    overlayState: false,
    cartMenuState: false,
    mainMenuState: false,
    searchMenuState: false,
    newsLetterPopupState: false,
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
      state.newsLetterPopupState = false;
    },
    toggleCartMenu: (state, { payload }) => {
      state.overlayState = payload;
      state.cartMenuState = payload;
      state.searchMenuState = false;
      state.mainMenuState = false;
      state.newsLetterPopupState = false;
    },
    toggleSearchMenu: (state, { payload }) => {
      state.overlayState = payload;
      state.searchMenuState = payload;
      state.cartMenuState = false;
      state.mainMenuState = false;
      state.newsLetterPopupState = false;
    },
    toggleNewsLetterPopup: (state, { payload }) => {
      state.overlayState = payload;
      state.newsLetterPopupState = payload;
      state.cartMenuState = false;
      state.mainMenuState = false;
      state.searchMenuState = false;
    },
  },
});

export const {
  closeOverlay,
  toggleMainMenu,
  toggleCartMenu,
  toggleSearchMenu,
  toggleNewsLetterPopup,
} = PortalSlice.actions;

export default PortalSlice.reducer;
