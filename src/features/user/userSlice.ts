import { AddressInput } from "./../profile/sections/addresses";
import { RootState } from "../../redux/store";
import {
  createSelector,
  createSlice
} from "@reduxjs/toolkit";
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

export interface Address extends AddressInput {
  _id: number;
  createdAt: Date;
  updatedAt: Date;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<any, LoginInput>({
      query: (userData) => ({
        url: `/sessions`,
        method: "POST",
        body: userData,
        credentials: "include"
      })
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: `/users/me`,
        credentials: "include"
      }),
      providesTags: ["User"]
    }),
    updateUser: builder.mutation<User, { [key: string]: string }>({
      query: (query) => ({
        url: `/users/update`,
        method: "POST",
        body: query,
        credentials: "include"
      }),
      invalidatesTags: ["User"]
    }),
    createAddress: builder.mutation<Address, AddressInput>({
      query: (query) => ({
        url: `/address`,
        method: "POST",
        body: query,
        credentials: "include"
      })
    })
  })
});

export const {
  useUserLoginMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useCreateAddressMutation
} = userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getCurrentUser.select();

const currentUser = null;

export const selectCurrentUser = createSelector(
  selectUserResult,
  (userResult) => userResult?.data ?? currentUser
);

const initialState = {
  currentUser: {} as User
};

export const API_URL = process.env.REACT_APP_API_URL;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
});

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.currentUser;
