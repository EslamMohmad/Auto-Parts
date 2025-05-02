import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    userData: {},
  },
  reducers: {
    getUserdata: (state, { payload }) => {
      if (payload?.email) {
        const displayName = payload?.email.slice(
          -payload?.email.length,
          payload?.email.indexOf("@")
        );
        state.userData = {
          displayName,
          email: payload?.email,
        };
      } else state.userData = {};
    },
  },
});

export const { getUserdata } = AuthSlice.actions;

export default AuthSlice.reducer;
