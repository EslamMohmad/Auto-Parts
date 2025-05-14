import { createAsyncThunk } from "@reduxjs/toolkit";
import { child, get, ref, set } from "firebase/database";
import { auth, database } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const shop_getProducts = createAsyncThunk(
  "ProductsSlice/shop_getProducts",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      const myRef = child(ref(database), `Auto-Parts/${payload}`);
      return (await get(myRef)).val();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const shop_getCategories = createAsyncThunk(
  "ProductsSlice/shop_getCategories",
  async (_, api) => {
    const { rejectWithValue } = api;
    try {
      const myRef = child(ref(database), `Auto-Parts`);
      return (await get(myRef)).val();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const shop_getProductDetails = createAsyncThunk(
  "ProductsSlice/shop_getProductDetails",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      const myRef = child(ref(database), `Auto-Parts/${payload?.category}`);
      return (await get(myRef)).val();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkout_createOrder = createAsyncThunk(
  "CartSlice/checkout_createOrder",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      const myRef = ref(database, `Auto-Parts-Orders/${payload.name}`);
      set(myRef, payload.details).catch((error) => alert(error));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const auth_loginAccount = createAsyncThunk(
  "AuthSlice/auth_loginAccount",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      const response = signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      return (await response).user.email;
    } catch (error) {
      rejectWithValue(error.message);
      alert("user is not exist => " + error.message);
    }
  }
);

export const auth_registerAccount = createAsyncThunk(
  "AuthSlice/auth_registerAccount",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      const response = createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      return (await response).user.email;
    } catch (error) {
      rejectWithValue(error.message);
      alert(error.message);
    }
  }
);

export const auth_logoutAccount = createAsyncThunk(
  "AuthSlice/auth_logoutAccount",
  async (_, api) => {
    const { rejectWithValue } = api;
    try {
      const response = signOut(auth);
      return await response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
