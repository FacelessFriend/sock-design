import $api from '../../../shared/axiosInstance';
import type {
  Basket,
  BasketApiResponse,
  AllBasketsApiResponse,
  AddBasket,
} from './types';
import type { ApiResponse } from '../socksApi/types';

//потом убрать параметр, так как из рес локалс берется
export async function getUsersBaskets(): Promise<Basket[]> {
  try {
    // console.log('userId', userId);
    const response = await $api.get<AllBasketsApiResponse>(
      //правка
      // `/baskets/user/${userId}`
      `/baskets/user`
    );

    if (response.status === 200 && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Getting baskets error', error);
    return [];
  }
}

export async function getBasketById(id: number): Promise<Basket | null> {
  try {
    const response = await $api.get<BasketApiResponse>(`/baskets/${id}`);

    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Getting basket by id error', error);
    return null;
  }
}

export async function createBasket(
  basketData: AddBasket
): Promise<Basket | null> {
  try {
    const response = await $api.post<BasketApiResponse>(`/baskets`, basketData);

    if (response.status === 201) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Creating basket error', error);
    return null;
  }
}

export async function deleteBasket(id: number): Promise<number> {
  try {
    const response = await $api.delete<ApiResponse<number>>(`/baskets/${id}`);

    if (response.status === 200) {
      return response.data.data;
    }
    return 0;
  } catch (error) {
    console.error('Deleting basket error', error);
    return 0;
  }
}

export async function updateBasket(
  id: number,
  basketData: AddBasket
): Promise<Basket | null> {
  try {
    const response = await $api.put<BasketApiResponse>(
      `/baskets/${id}`,
      basketData
    );

    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Creating basket error', error);
    return null;
  }
}
