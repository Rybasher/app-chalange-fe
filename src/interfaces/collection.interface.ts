import { Bid } from "./bid.interface";

export interface PaginatedCollections {
  data: Collection[];
  total: number;
  page: number;
  limit: number;
}
export interface Collection {
  id: number;
  name: string;
  descriptions: string;
  stocks: number;
  price: number;
  userId: number;
  bids?: Bid[];
}

export interface CreateCollection {
  name: string;
  descriptions: string;
  stocks: number;
  price: number;
}

export interface UpdateCollection extends CreateCollection {}
