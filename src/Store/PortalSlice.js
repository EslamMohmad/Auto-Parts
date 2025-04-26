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
    filterMenuState: false,
    productQuickViewState: false,
    producCompareState: false,
    productAddToCardState: false,
    authState: false,
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
    toggleFilterMenuState: (state, { payload }) => {
      setTrueTargetState(["overlayState", "filterMenuState"], state, payload);
    },
    toggleProductCompare: (state, { payload }) => {},
    toggleProductAddToCard: (state, { payload }) => {
      setTrueTargetState(["overlayState", "cartMenuState"], state, payload);
    },
    toggleLoadingState: (state, { payload }) => {
      state.loadingState = payload;
    },
    toggleAuthState: (state, { payload }) => {
      setTrueTargetState(["overlayState", "authState"], state, payload);
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
  toggleFilterMenuState,
  toggleProductCompare,
  toggleProductAddToCard,
  toggleLoadingState,
  toggleAuthState,
} = PortalSlice.actions;

export default PortalSlice.reducer;
