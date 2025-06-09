import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  child,
  ref,
  set,
  get,
  remove,
  equalTo,
  orderByValue,
  query,
} from "firebase/database";
import { auth, database } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { productMatchesSearch } from "../Utils/Function";

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
    const userUID = auth?.currentUser?.uid;

    try {
      const myRef = ref(database, `Auto-Parts-Users/${userUID}`);
      const userExist = (await get(myRef)).exists();
      if (userExist) {
        const orders_products = ref(
          database,
          `Auto-Parts-Users/${userUID}/orders/${
            Object.keys(payload?.details?.orders)[0]
          }/products`
        );
        const orders_details = ref(
          database,
          `Auto-Parts-Users/${userUID}/orders/${
            Object.keys(payload?.details?.orders)[0]
          }/details`
        );

        const {
          company_name,
          coupon_code,
          order_notes,
          order_number,
          payment_method,
          postcode,
          shipping,
          street_address,
          subtotal,
          town,
        } = payload?.details;

        const details = {
          company_name,
          coupon_code,
          order_notes,
          order_number,
          payment_method,
          postcode,
          shipping,
          street_address,
          subtotal,
          town,
        };

        set(orders_products, Object.values(payload?.details?.orders)[0]).catch(
          (error) => alert(`something wrong with your data => ${error}`)
        );

        set(orders_details, details).catch((error) =>
          alert(`something wrong with your data => ${error}`)
        );
      } else {
        return set(myRef, payload.details).catch((error) =>
          alert(`you must login or create account => ${error}`)
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const wishlist_addProductToUserWishlist = createAsyncThunk(
  "ProductsSlice/wishlist_addProductToUserWishlist",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      if (auth.currentUser) {
        const myRef = ref(
          database,
          `Auto-Parts-Users/${auth?.currentUser?.uid}/wishlist/${payload.heading}`
        );
        const wishlistLength = ref(
          database,
          `Auto-Parts-Users/${auth?.currentUser?.uid}/wishlist`
        );
        const productsLength = (await get(wishlistLength)).size;

        return (
          set(myRef, payload), { message: payload.heading, productsLength }
        );
      } else return { message: "you have to login", productsLength: 0 };
    } catch (error) {
      return { message: "somthing wrong please try again", productsLength: 0 };
    }
  }
);

export const wishlist_removeProductFromUserWishlist = createAsyncThunk(
  "ProductsSlice/wishlist_removeProductFromUserWishlist",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      if (auth.currentUser) {
        if (payload?.heading) {
          const myRef = ref(
            database,
            `Auto-Parts-Users/${auth?.currentUser?.uid}/wishlist/${payload.heading}`
          );
          remove(myRef);
        } else {
          const myRef = ref(
            database,
            `Auto-Parts-Users/${auth?.currentUser?.uid}/wishlist`
          );

          remove(myRef);
        }
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const wishlist_getProductUserWishlist = createAsyncThunk(
  "ProductsSlice/wishlist_getProductUserWishlist",
  async (_, api) => {
    const { rejectWithValue } = api;
    try {
      if (auth.currentUser) {
        const myRef = child(
          ref(database),
          `Auto-Parts-Users/${auth?.currentUser?.uid}/wishlist`
        );
        return (await get(myRef)).val() || {};
      } else return {};
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

      const userUID = (await response)?.user?.uid;
      const userRef = child(ref(database), `Auto-Parts-Users/${userUID}`);

      return (await get(userRef)).val();
    } catch (error) {
      rejectWithValue(error.message);
      alert("user is not exist, or password is wrong => " + error.message);
    }
  }
);

export const auth_registerAccount = createAsyncThunk(
  "AuthSlice/auth_registerAccount",
  async (payload, api) => {
    const { rejectWithValue } = api;
    try {
      const userData = {
        displayName:
          payload.displayName || payload.first_name + " " + payload.last_name,
        first_name: payload.first_name,
        phone: payload.phone,
        last_name: payload.last_name,
        email_address: payload.email_address,
        // password: payload.password,
      };

      const response = createUserWithEmailAndPassword(
        auth,
        payload.email_address,
        payload.password
      );

      const userUID = (await response).user.uid;
      const user = ref(database, `Auto-Parts-Users/${userUID}`);

      set(user, userData);
      return userData;
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

export const search_getSearchResults = createAsyncThunk(
  "SearchSlice/search_getSearchResults",
  async (searchTerm, api) => {
    const { rejectWithValue } = api;
    try {
      const dbRef = ref(database, "Auto-Parts");
      const snapshot = await get(dbRef);
      const data = snapshot.val();

      if (!data) return [];

      const allProducts = Object.values(data).flatMap((categoryArr) =>
        Array.isArray(categoryArr) ? categoryArr : []
      );

      const filtered = allProducts.filter((product) =>
        productMatchesSearch(product, searchTerm)
      );

      return filtered;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
