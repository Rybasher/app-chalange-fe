export interface Collection {
  id: number;
  name: string;
  descriptions: string;
  stocks: number;
  price: number;
  userId: number;
}

export interface CreateCollection {
  name: string;
  descriptions: string;
  stocks: number;
  price: number;
}

export interface UpdateCollection extends CreateCollection {}
