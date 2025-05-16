export interface FavoriteColor {
  id: number;
  code: string;
  color: string;
}

export interface FavoritePicture {
  id: number;
  picture: string;
  picture_url: string;
}

export interface FavoritePattern {
  id: number;
  pattern: string;
  pattern_url: string;
}

export interface FavoriteSock {
  id: number;
  user_id: number;
  color_id: number;
  picture_id: number;
  pattern_id: number;
  Color: FavoriteColor;
  Picture: FavoritePicture;
  Pattern: FavoritePattern;
}

export interface FavoriteItem {
  id: number;
  user_id: number;
  sock_id: number;
  sock: FavoriteSock;
}

export type UserFavoritesResponse = FavoriteItem[];

export interface AddFavoriteParams {
  user_id: number;
  sock_id: number;
}

export type DeleteFavoriteResponse = number;
