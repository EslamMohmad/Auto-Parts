import { createSlice } from "@reduxjs/toolkit";
import {
  auth_loginAccount,
  auth_logoutAccount,
  auth_registerAccount,
} from "./APIS";

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    userData: {},
    accountOptionsState: false,
  },
  reducers: {
    getUserData: (state, { payload }) => {
      state.userData = payload;
    },
    toggleAccountOptions: (state, { payload }) => {
      state.accountOptionsState = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth_loginAccount.fulfilled, (state, { payload }) => {
      state.userData = accountDetailsHandler(payload);
    });
    builder.addCase(auth_registerAccount.fulfilled, (state, { payload }) => {
      state.userData = payload;
    });
    builder.addCase(auth_logoutAccount.fulfilled, (state, { payload }) => {
      state.userData = {};
      state.accountOptionsState = false;
    });
  },
});

export const { getUserData, toggleAccountOptions } = AuthSlice.actions;

export default AuthSlice.reducer;

function accountDetailsHandler(payload) {
  if (payload) {
    const displayName = payload?.slice(-payload?.length, payload?.indexOf("@"));
    return {
      displayName,
      email_address: payload,
    };
  } else return {};
}
