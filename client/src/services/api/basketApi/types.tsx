import type { Sock, ApiResponse } from '../socksApi/types';

export interface Basket {
  id: number;
  user_id: number;
  socks_id: number;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  Sock: Sock;
}

export type BasketApiResponse = ApiResponse<Basket>;

export type AllBasketsApiResponse = ApiResponse<Basket[]>;

export interface AddBasket {
  sockId: number;
  quantity?: number;
}
