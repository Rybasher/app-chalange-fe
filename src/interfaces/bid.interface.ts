export interface Bid {
  id: number;
  collectionId: number;
  price: number;
  userId: number;
  status: string;
}

export interface CreateBid {
  price: number;
}

export interface UpdateBid extends CreateBid {}
