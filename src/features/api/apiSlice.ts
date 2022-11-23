import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api"
  }),
  tagTypes: ["Category", "Product"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories"
    })
  })
});

export const { useGetCategoriesQuery } = apiSlice;
