import $api from '../../../shared/axiosInstance';
import type {
  AddSock,
  AllSocksApiResponse,
  ApiResponse,
  Sock,
  SockApiResponse,
} from './types';

export async function getUsersSocks(userId: number): Promise<Sock[]> {
  try {
    const response = await $api.get<AllSocksApiResponse>(
      `/socks/user/${userId}`
    );

    if (response.status === 200 && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Getting socks error', error);
    return [];
  }
}

export async function getSockById(id: number): Promise<Sock | null> {
  try {
    const response = await $api.get<SockApiResponse>(`/socks/${id}`);

    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Getting sock by id error', error);
    return null;
  }
}

export async function createSock(sockData: AddSock): Promise<Sock | null> {
  try {
    const response = await $api.post<SockApiResponse>(`/socks`, sockData);

    if (response.status === 201) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Creating sock error', error);
    return null;
  }
}

export async function deleteSock(id: number): Promise<number> {
  try {
    const response = await $api.delete<ApiResponse<number>>(`/socks/${id}`);

    if (response.status === 200) {
      return response.data.data;
    }
    return 0;
  } catch (error) {
    console.error('Deleting sock error', error);
    return 0;
  }
}

export async function updateSock(
  id: number,
  sockData: AddSock
): Promise<Sock | null> {
  try {
    const response = await $api.put<SockApiResponse>(`/socks/${id}`, sockData);
    
    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Creating sock error', error);
    return null;
  }
}
