import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { userApi } from "./userApi";

import { setTokens } from "../features/authSlice";
import { Tokens } from "@/interfaces/tokens.interfaces";
import { Login, Registration } from "@/interfaces/user.interface";
import { toast } from "react-toastify";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    registerUser: builder.mutation<Tokens, Registration>({
      query(data) {
        return {
          url: "auth/registration",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            await dispatch(
              userApi.endpoints.getMe.initiate({
                token: result.data.accessToken,
              })
            );
            dispatch(setTokens(result.data));
          }
        } catch (error: any) {
          toast.error(error?.error?.data?.detail?.message);
        }
      },
    }),
    loginUser: builder.mutation<Tokens, Login>({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            await dispatch(
              userApi.endpoints.getMe.initiate({
                token: result.data.accessToken,
              })
            );
            dispatch(setTokens(result.data));
          }
        } catch (error: any) {
          toast.error(error?.error?.data?.detail?.message);
        }
      },
    }),
    forgotPassword: builder.mutation<{}, { email: string }>({
      query(params) {
        return {
          url: `/auth/forgot-password`,
          credentials: "include",
          method: "POST",
          body: params,
        };
      },
    }),
    resetPassword: builder.mutation<{}, { password: string; token: string }>({
      query(params) {
        return {
          url: `/auth/reset-password`,
          credentials: "include",
          method: "POST",
          body: params,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
