import { createSlice } from "@reduxjs/toolkit";
import { setTrueTargetState } from "../Utils/Function";

const PortalSlice = createSlice({
  name: "PortalSlice",
  initialState: {
    overlayState: false,
    cartMenuState: false,
    mainMenuState: false,
    searchMenuState: false,
    newsLetterPopupState: false,
    productQuickViewState: false,
    producCompareState: false,
    productAddToCardState: false,
    loadingState: { state: false, method: "" },
  },
  reducers: {
    closeOverlay: (state) => {
      for (let key in state) {
        key !== "loadingState" && (state[key] = false);
      }
    },
    toggleMainMenu: (state, { payload }) => {
      setTrueTargetState(["overlayState", "mainMenuState"], state, payload);
    },
    toggleCartMenu: (state, { payload }) => {
      setTrueTargetState(["overlayState", "cartMenuState"], state, payload);
    },
    toggleSearchMenu: (state, { payload }) => {
      setTrueTargetState(["overlayState", "searchMenuState"], state, payload);
    },
    toggleNewsLetterPopup: (state, { payload }) => {
      setTrueTargetState(
        ["overlayState", "newsLetterPopupState"],
        state,
        payload
      );
    },
    toggleProductQuickView: (state, { payload }) => {
      setTrueTargetState(
        ["overlayState", "productQuickViewState"],
        state,
        payload
      );
    },
    toggleProductCompare: (state, { payload }) => {},
    toggleProductAddToCard: (state, { payload }) => {},
    toggleLoadingState: (state, { payload }) => {
      state.loadingState = payload;
    },
  },
});

export const {
  closeOverlay,
  toggleMainMenu,
  toggleCartMenu,
  toggleSearchMenu,
  toggleNewsLetterPopup,
  toggleProductQuickView,
  toggleProductCompare,
  toggleProductAddToCard,
  toggleLoadingState,
} = PortalSlice.actions;

export default PortalSlice.reducer;
