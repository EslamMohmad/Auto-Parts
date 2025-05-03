import { createAsyncThunk } from "@reduxjs/toolkit";
import { child, get, ref, set } from "firebase/database";
import { database } from "../Firebase/Firebase";

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
  "OrderSlice/checkout_createOrder",
  async (payload, api) => {
    const { rejectWithValue } = api;
    console.log(payload);
    try {
      const myRef = ref(database, `Auto-Parts-Customers/${payload.name}`);
      set(myRef, payload.details)
        .then(() => console.log("done"))
        .catch((error) => console.error(error));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
