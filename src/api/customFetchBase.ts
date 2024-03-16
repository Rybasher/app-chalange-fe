import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logoutState, setTokens } from "../features/authSlice";
import { Tokens } from "@/interfaces/tokens.interfaces";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/`;

const mutex = new Mutex();

const baseQuery: BaseQueryFn<string | FetchArgs, any, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (
      headers: Headers,
      { getState }: { getState: () => any }
    ) => {
      if (getState().authState.tokens) {
        headers.set(
          "Authorization",
          `Bearer ${getState().authState.tokens.accessToken}`
        );
      }
      return headers;
    },
  });

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const tokenLS =
          typeof window !== "undefined" ? localStorage.getItem("tokens") : null;
        let token: Tokens;
        if (tokenLS) {
          token = JSON.parse(tokenLS);
        } else {
          token = { accessToken: "", refreshToken: "" };
        }
        const refreshResult = await baseQuery(
          {
            credentials: "include",
            url: "auth/refresh-tokens",
            method: "POST",
            body: {
              token: token?.refreshToken,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setTokens(refreshResult.data));
        } else {
          api.dispatch(logoutState());
          window.location.href = "/auth/singin";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default customFetchBase;
