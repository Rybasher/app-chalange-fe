import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tokens } from "@/interfaces/tokens.interfaces";
import { IUser } from "@/interfaces/user.interface";

type IUserState = IUser | null;

type TokensState = Tokens | null;

const initialState = {
  user: null as IUserState,
  //@ts-ignore
  tokens:
    typeof window !== "undefined"
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("tokens"))
      : (null as TokensState),
  isAuntificated: false,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    logoutState: (state) => {
      state.user = null;
      state.tokens = null;
      localStorage.removeItem("tokens");
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuntificated = true;
    },
    setTokens: (state, action: PayloadAction<Tokens>) => {
      localStorage.setItem("tokens", JSON.stringify(action.payload));
      state.tokens = action.payload;
    },
    setAuth0Token: (state, action: PayloadAction<string>) => {
      state.tokens = { accessToken: action.payload };
      localStorage.setItem(
        "tokens",
        JSON.stringify({ accessToken: action.payload })
      );
    },
  },
});

export const authSliceReducer = authSlice.reducer;
export const { logoutState, setUser, setTokens } = authSlice.actions;
export const authSliceActions = authSlice.actions;
