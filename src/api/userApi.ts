import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/authSlice";
import customFetchBase from "./customFetchBase";
import { IUser } from "@/interfaces/user.interface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, { token: string }>({
      query(params) {
        return {
          url: "user/me",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            dispatch(setUser(result.data));
          }
        } catch (error) {}
      },
    }),
  }),
});
