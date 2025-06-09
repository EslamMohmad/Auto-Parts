import { createSlice } from "@reduxjs/toolkit";
import { setTrueTargetState } from "../Utils/Function";
import { auth_loginAccount, auth_registerAccount } from "./APIS";

const PortalSlice = createSlice({
  name: "PortalSlice",
  initialState: {
    overlayState: false,
    cartMenuState: false,
    mainMenuState: false,
    searchMenuState: false, // for less than 1024px left side search
    searchState: { state: false, value: "" }, // for desktop search
    newsLetterPopupState: false,
    fixedNavbarState: false,
    userOptionsMenuState: false,
    filterMenuState: false,
    productQuickViewState: false,
    producCompareState: false,
    productAddToCardState: false,
    authState: false,
    wishlistState: false,
    wishlistMessageState: false,
    searchState: false,
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
    toggleUserOptionsMenu: (state, { payload }) => {
      setTrueTargetState(
        ["overlayState", "userOptionsMenuState"],
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
    toggleWishlistState: (state, { payload }) => {
      setTrueTargetState(["overlayState", "wishlistState"], state, payload);
    },
    setWishlistMessage: (state, { payload }) => {
      state.wishlistMessageState = payload;
    },
    setFixedNavbar: (state, { payload }) => {
      state.fixedNavbarState = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth_loginAccount.fulfilled, (state) => {
      setTrueTargetState(["overlayState", "authState"], state, false);
    });
    builder.addCase(auth_registerAccount.fulfilled, (state) => {
      setTrueTargetState(["overlayState", "authState"], state, false);
    });
  },
});

export const {
  closeOverlay,
  toggleMainMenu,
  toggleCartMenu,
  toggleSearchMenu,
  toggleUserOptionsMenu,
  toggleNewsLetterPopup,
  setFixedNavbar,
  toggleProductQuickView,
  toggleFilterMenuState,
  toggleProductCompare,
  toggleProductAddToCard,
  toggleLoadingState,
  toggleAuthState,
  toggleWishlistState,
  setWishlistMessage,
} = PortalSlice.actions;

export default PortalSlice.reducer;
