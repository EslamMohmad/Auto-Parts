import { createSlice } from "@reduxjs/toolkit";
import { search_getSearchResults } from "./APIS";

const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState: {
    searchState: { state: false, value: "" },
    searchResults: [],
    inputSearchStates: {
      inputValue: "",
      inputFocus: false,
    },
  },
  reducers: {
    setSearchState: (state, { payload }) => {
      state.searchState = payload;
    },
    setInputSearchStates: (state, { payload }) => {
      state.inputSearchStates = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(search_getSearchResults.fulfilled, (state, { payload }) => {
      state.searchResults = payload;
      if (!payload || Object.keys(payload).length === 0) {
        state.searchResults = [];
      }
    });
  },
});

export const { setSearchState, setInputSearchStates } = SearchSlice.actions;

export default SearchSlice.reducer;
