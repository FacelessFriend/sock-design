import $api from '../../../shared/axiosInstance';


export async function getUsersBaskets(userId: number): Promise<Sock[]> {
  try {
    return await $api(`/socks/user/${userId}`);
  } catch (error) {
    console.error('Getting socks error', error);
    return [];
  }
}

export async function getSockById(id: number): Promise<Sock | null> {
  try {
    return await $api(`/socks/${id}`);
  } catch (error) {
    console.error('Getting sock by id error', error);
    return null;
  }
}

export async function createSock(sockData: AddSock): Promise<Sock | null> {
  try {
    return await $api.post(`/socks`, sockData);
  } catch (error) {
    console.error('Creating sock error', error);
    return null;
  }
}

export async function deleteSock(id: number): Promise<number> {
  try {
    return await $api.delete(`/socks/${id}`);
  } catch (error) {
    console.error('Deleting sock error', error);
    return 0;
  }
}

export async function updateSock(id: number, sockData: AddSock): Promise<Sock | null> {
  try {
    return await $api.put(`/socks/${id}`, sockData);
  } catch (error) {
    console.error('Creating sock error', error);
    return null;
  }
}