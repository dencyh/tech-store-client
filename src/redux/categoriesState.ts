import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../types/category";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const url = process.env.REACT_APP_API_URL + "/api/categories";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

export const categoriesSlice = createSlice({
  name: "counter",
  initialState: {
    categories: [] as Category[],
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export default categoriesSlice.reducer;
