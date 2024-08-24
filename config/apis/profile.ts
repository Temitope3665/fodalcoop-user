import client from '@/lib/axios-instance';
import { MESSAGE_EP, PROFILE_EP } from '../endpoints';
import { ApiResponse, IMessageResponse } from '@/types';
import { z } from 'zod';
import { formSchema } from '@/components/forms/profile-form';
import { passwordSchema } from '@/components/forms/change-password-form';

export const getProfile = (): Promise<IMessageResponse[]> =>
  client.get(PROFILE_EP).then((response) => response.data);

export const updateProfile = (
  payload: z.infer<typeof formSchema>
): Promise<ApiResponse> =>
  client
    .post(`${PROFILE_EP}/update`, payload)
    .then((response) => response.data);

export const updatePassword = (
  payload: z.infer<typeof passwordSchema>
): Promise<ApiResponse> =>
  client
    .post(`${PROFILE_EP}/change-password`, payload)
    .then((response) => response.data);
