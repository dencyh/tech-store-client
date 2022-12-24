import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const USER_IN = false;

export interface Category {
  _id: string;
  name: string;
  type: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api"
  }),
  tagTypes: ["Category", "Product", "Cart", "Bookmarks", "User", "Review"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories"
    })
  })
});

export const { useGetCategoriesQuery } = apiSlice;
