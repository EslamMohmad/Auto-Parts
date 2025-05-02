import { createAsyncThunk } from "@reduxjs/toolkit";
import { child, get, ref } from "firebase/database";
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
