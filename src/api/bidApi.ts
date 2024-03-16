import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { Bid, CreateBid, UpdateBid } from "@/interfaces/bid.interface";

export const bidActionsApi = createApi({
  reducerPath: "bidActionsApi",
  baseQuery: customFetchBase,
  tagTypes: ["bid"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getBidByCollection: builder.query<Bid[], { collectionId: number }>({
      query(params) {
        return {
          url: `/bid/${params.collectionId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
        };
      },
    }),
    createBid: builder.mutation<Bid, { collectionId: number; dto: CreateBid }>({
      query: ({ collectionId, dto }) => ({
        url: `/bid/${collectionId}`,
        method: "POST",
        body: dto,
        credentials: "include",
      }),
    }),
    updateBid: builder.mutation<Bid, { bidId: number; dto: UpdateBid }>({
      query: ({ bidId, dto }) => ({
        url: `/bid/${bidId}`,
        method: "PATCH",
        body: dto,
        credentials: "include",
      }),
    }),
    deleteBid: builder.mutation<void, { bidId: number }>({
      query: ({ bidId }) => ({
        url: `/bid/${bidId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    acceptBid: builder.mutation<void, { bidId: number; collectionId: number }>({
      query: ({ collectionId, bidId }) => ({
        url: `/bid/accept/${collectionId}/${bidId}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    rejectBid: builder.mutation<void, { bidId: number; collectionId: number }>({
      query: ({ collectionId, bidId }) => ({
        url: `/bid/reject/${collectionId}/${bidId}`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetBidByCollectionQuery,
  useCreateBidMutation,
  useUpdateBidMutation,
  useDeleteBidMutation,
  useAcceptBidMutation,
  useRejectBidMutation,
} = bidActionsApi;
