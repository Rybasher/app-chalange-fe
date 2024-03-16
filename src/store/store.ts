import { authApi } from "@/api/authApi";
import { bidActionsApi } from "@/api/bidApi";
import { collectionActionsApi } from "@/api/collectionApi";
import { userApi } from "@/api/userApi";
import { authSliceReducer } from "@/features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "@store/apiService";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [collectionActionsApi.reducerPath]: collectionActionsApi.reducer,
    [bidActionsApi.reducerPath]: bidActionsApi.reducer,

    authState: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiService.middleware,
      authApi.middleware,
      userApi.middleware,
      collectionActionsApi.middleware,
      bidActionsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
