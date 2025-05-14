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

export interface ColorSock {
  code: string;
  color: string;
}
export interface PatternSock {
  pattern: string;
  pattern_url: string;
}
export interface PictureSock {
  picture_url: string;
  picture: string;
}

export interface AddSock {
  colorId: number;
  pictureId: number;
  patternId: number;
}
