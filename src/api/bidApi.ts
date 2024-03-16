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
    createBid: builder.query<Bid, { collectionId: number; dto: CreateBid }>({
      query(params) {
        return {
          url: `/bid/${params.collectionId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
          method: "POST",
          body: params.dto,
        };
      },
    }),
    updateBid: builder.query<Bid, { bidId: number; dto: UpdateBid }>({
      query(params) {
        return {
          url: `/bid/${params.bidId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
          method: "PATCH",
          body: params.dto,
        };
      },
    }),
    deleteBid: builder.query<void, { bidId: number }>({
      query(params) {
        return {
          url: `/bid/${params.bidId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
          method: "DELETE",
        };
      },
    }),
    acceptBid: builder.query<void, { bidId: number; collectionId: number }>({
      query(params) {
        return {
          url: `/bid/accept/${params.collectionId}/${params.bidId}`,
          credentials: "include",
          keepUnusedDataFor: 2,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useGetBidByCollectionQuery,
  useCreateBidQuery,
  useUpdateBidQuery,
  useDeleteBidQuery,
  useAcceptBidQuery,
} = bidActionsApi;
