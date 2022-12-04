import { toast } from "react-toastify";
import { Product } from "../../types/products/core.product";
import { apiSlice } from "../api/apiSlice";

export interface Bookmarks {
  userId: string;
  products: Product[];
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBookmars: builder.mutation<
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
    getBookmarks: builder.query<Bookmarks, { userId: string }>({
      query: ({ userId }) => ({
        url: `/bookmarks/${userId}`,
        credentials: "include"
      }),
      providesTags: ["Bookmarks"]
    })
  })
});

export const { useUpdateBookmarsMutation, useGetBookmarksQuery } =
  extendedApiSlice;
