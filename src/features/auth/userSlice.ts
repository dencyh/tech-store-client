import { RootState } from "./../../redux/store";
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from "@reduxjs/toolkit";
import { LoginInput } from "../../schemas/user.schema";
import { apiSlice } from "../api/apiSlice";
import axios from "axios";

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
    })
  })
});

export const {
  useUserLoginMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation
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
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await axios.get(`${API_URL}/api/users/me`, {
      withCredentials: true
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  }
});

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.currentUser;
