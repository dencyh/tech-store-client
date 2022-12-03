import { LoginInput } from "../../schemas/user.schema";
import { apiSlice } from "../api/apiSlice";

export interface ProductInCart {
  productId: string;
  quantity: number;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<any, LoginInput>({
      query: (userData) => ({
        url: `/sessions`,
        method: "POST",
        body: userData,
        credentials: "include"
      })
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: `/me`,
        credentials: "include"
      })
    })
  })
});

console.log(extendedApiSlice);

export const { useUserLoginMutation, useGetUserQuery } = extendedApiSlice;
