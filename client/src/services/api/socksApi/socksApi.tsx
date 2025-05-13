import $api from '../../../shared/axiosInstance';
import type { Sock } from './types';

export async function getUsersSocks(userId: number): Promise<Sock[]> {
  try {
    return await $api(`/socks/user/${userId}`);
  } catch (error) {
    console.error('Getting socks error', error);
    return [];
  }
}
