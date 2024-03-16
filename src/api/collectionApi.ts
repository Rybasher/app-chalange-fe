import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { Bid, CreateBid, UpdateBid } from "@/interfaces/bid.interface";
import {
  Collection,
  CreateCollection,
  PaginatedCollections,
  UpdateCollection,
} from "@/interfaces/collection.interface";

export const collectionActionsApi = createApi({
  reducerPath: "collectionActionsApi",
  baseQuery: customFetchBase,
  tagTypes: ["collection"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getAllCollections: builder.query<PaginatedCollections, { page: number }>({
      query: ({ page = 1 }) => ({
        url: `/collection`,
        params: { page },
        credentials: "include",
        keepUnusedDataFor: 2,
      }),
    }),

    createCollection: builder.mutation<Collection, CreateCollection>({
      query: (dto) => ({
        url: `/collection`,
        method: "POST",
        body: dto,
        credentials: "include",
      }),
    }),

    updateCollection: builder.mutation<
      Collection,
      { collectionId: number; dto: CreateCollection }
    >({
      query: ({ collectionId, dto }) => ({
        url: `/collection/${collectionId}`,
        method: "PATCH",
        body: dto,
        credentials: "include",
      }),
    }),
    deleteCollection: builder.mutation<void, { collectionId: number }>({
      query: ({ collectionId }) => ({
        url: `/collection/${collectionId}`,
        method: "DELETE",
        credentials: "include",
      }),
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
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionByIdQuery,
} = collectionActionsApi;
