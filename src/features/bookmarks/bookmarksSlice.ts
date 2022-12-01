import { toast } from "react-toastify";
import { Bookmarks } from "../../types/bookmarks";
import { Product } from "../../types/products/core.product";
import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBookmars: builder.mutation<
      Product[],
      { userId: string; products: Product["_id"][] }
    >({
      query: ({ userId, products }) => ({
        url: `/bookmarks/${userId}`,
        method: "PUT",
        body: { products }
      }),
      invalidatesTags: ["Bookmarks", "Product"]
    }),
    getBookmarks: builder.query<Bookmarks, { userId: string }>({
      query: ({ userId }) => `/bookmarks/${userId}`,
      providesTags: ["Bookmarks"]
    })
  })
});

export const { useUpdateBookmarsMutation, useGetBookmarksQuery } =
  extendedApiSlice;
