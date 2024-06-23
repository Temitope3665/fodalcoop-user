import client from '@/lib/axios-instance';
import { LOGIN_EP } from '../endpoints';
import { ApiResponse } from '@/types';

export const loginUser = (payload: {
  email: string;
  password: string;
}): Promise<ApiResponse> =>
  client.post(LOGIN_EP, payload).then((response) => response.data);
