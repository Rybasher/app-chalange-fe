export interface Bid {
  id: number;
  collectionId: number;
  price: number;
  userId: number;
  status: string;
}

export interface CreateBid {
  price: number;
  status: string;
}

export interface UpdateBid extends CreateBid {}
