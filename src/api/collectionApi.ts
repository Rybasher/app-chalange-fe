import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { Bid, CreateBid, UpdateBid } from "@/interfaces/bid.interface";
import {
  Collection,
  CreateCollection,
  UpdateCollection,
} from "@/interfaces/collection.interface";

export const collectionActionsApi = createApi({
  reducerPath: "collectionActionsApi",
  baseQuery: customFetchBase,
  tagTypes: ["collection"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getAllCollections: builder.query<Collection[], {}>({
      query(params) {
        return {
          url: `/collection`,
          credentials: "include",
          keepUnusedDataFor: 2,
        };
      },
    }),
    createCollection: builder.mutation<Collection, CreateCollection>({
      query: (dto) => ({
        url: `/collection`,
        method: "POST",
        body: dto,
        credentials: "include",
      }),
    }),
    updateCollection: builder.query<
      Collection,
      { collectionId: number; dto: UpdateCollection }
    >({
      query(params) {
        return {
          url: `/collection/${params.collectionId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
          method: "PATCH",
          body: params.dto,
        };
      },
    }),
    deleteCollection: builder.query<void, { collectionId: number }>({
      query(params) {
        return {
          url: `/collection/${params.collectionId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
          method: "DELETE",
        };
      },
    }),
    getCollectionById: builder.query<Collection, { collectionId: number }>({
      query(params) {
        return {
          url: `/collection/${params.collectionId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
        };
      },
    }),
  }),
});

export const {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation,
  useUpdateCollectionQuery,
  useDeleteCollectionQuery,
  useGetCollectionByIdQuery,
} = collectionActionsApi;
