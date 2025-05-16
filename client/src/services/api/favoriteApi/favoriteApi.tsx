import $api from '../../../shared/axiosInstance';
import type {
  UserFavoritesResponse,
  AddFavoriteParams,
  FavoriteItem,
  DeleteFavoriteResponse,
  FavoriteApi
} from './types';

export const getFavorites = async (userId: number): Promise<UserFavoritesResponse> => {
  try {
    const response = await $api.get<UserFavoritesResponse>(`/favorites/${userId}`);
    // const response = await $api.get<UserFavoritesResponse>(`/favorites/1`)
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const addFavorite = async (
  params: AddFavoriteParams
): Promise<FavoriteItem> => {
  try {
    const response = await $api.post<FavoriteItem>(`/favorites/${userId}`, params);
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const deleteFavorite = async (
  favoriteId: number
): Promise<DeleteFavoriteResponse> => {
  try {
    const response = await $api.delete<DeleteFavoriteResponse>(`/favorites/${favoriteId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting favorite:', error);
    throw error;
  }
};

export const favoriteApi: FavoriteApi = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};