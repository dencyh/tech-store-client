import { createSelector } from "@reduxjs/toolkit";
import { LoginInput } from "../../schemas/user.schema";
import { apiSlice } from "../api/apiSlice";

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  session: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
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
        url: `/users/me`,
        credentials: "include"
      })
    })
  })
});

export const { useUserLoginMutation, useGetUserQuery } = extendedApiSlice;

export const selectUserResult = extendedApiSlice.endpoints.getUser.select();
const loggedIn = null;

export const selectLoggedUser = createSelector(
  selectUserResult,
  (userResult) => userResult?.data ?? loggedIn
);
