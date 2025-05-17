export interface Sock {
  id: number;
  user_id: number;
  color_id: number;
  picture_id: number;
  pattern_id: number;
  createdAt?: string;
  updatedAt?: string;
  User?: {
    id: number;
    email: string;
  };
  Color: ColorSock;
  Pattern: PatternSock;
  Picture: PictureSock;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export type SockApiResponse = ApiResponse<Sock>;

export type AllSocksApiResponse = ApiResponse<Sock[]>;

export type ColorApiResponse = ApiResponse<Color>;

export type AllColorsApiResponse = ApiResponse<Color[]>;

export type PatternApiResponse = ApiResponse<Pattern>;

export type AllPatternsApiResponse = ApiResponse<Pattern[]>;

export type PictureApiResponse = ApiResponse<Picture>;

export type AllPicturesApiResponse = ApiResponse<Picture[]>;

export interface ColorSock {
  code: string;
  color: string;
}
export interface Color extends ColorSock {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatternSock {
  pattern: string;
  pattern_url: string;
}
export interface Pattern extends PatternSock {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PictureSock {
  picture_url: string;
  picture: string;
}

export interface Picture extends PictureSock {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddSock {
  colorId: number;
  pictureId?: number;
  patternId?: number;
}
