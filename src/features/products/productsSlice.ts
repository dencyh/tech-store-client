import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryProducts: builder.query({
      query: (category) => `/products?type=${category}`
    })
  })
});

export const { useGetCategoryProductsQuery } = extendedApiSlice;
