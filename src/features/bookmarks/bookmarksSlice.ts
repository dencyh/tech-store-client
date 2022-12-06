import { RootState } from "./../../redux/store";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { Product } from "../../types/products/core.product";
import { apiSlice } from "../api/apiSlice";
import type { EntityState } from "@reduxjs/toolkit";

export const bookmarksAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id
});

export const initialState = bookmarksAdapter.getInitialState();

export const bookmarksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBookmarks: builder.mutation<
      Product[],
      { userId: string; products: Product["_id"][] }
    >({
      query: ({ userId, products }) => ({
        url: `/bookmarks/${userId}`,
        method: "PUT",
        body: { products },
        credentials: "include"
      }),
      invalidatesTags: ["Bookmarks", "Product"]
    }),
    getBookmarks: builder.query<EntityState<Product>, string>({
      query: (userId) => ({
        url: `/bookmarks/${userId}`,
        credentials: "include"
      }),
      transformResponse: (response: Product[]) => {
        return bookmarksAdapter.setAll(initialState, response);
      },
      providesTags: ["Bookmarks"]
    })
  })
});

export const { useUpdateBookmarksMutation, useGetBookmarksQuery } =
  bookmarksApiSlice;

// getSelectors wrapper to pass userId
export const getBookmarksSelectors = (userId: string) => {
  const selectBookmarksResult =
    bookmarksApiSlice.endpoints.getBookmarks.select(userId);

  const selectBookmarksData = createSelector(
    selectBookmarksResult,
    (bookmarksResult) => bookmarksResult.data
  );
  const { selectAll: selectAllBookmarks } = bookmarksAdapter.getSelectors(
    (state: RootState) => selectBookmarksData(state) ?? initialState
  );

  return {
    selectAllBookmarks
  };
};
