import client from '@/lib/axios-instance';
import { MESSAGE_EP } from '../endpoints';
import { ApiResponse, IMessageResponse } from '@/types';
import { formSchema } from '@/components/forms/add-message-form';
import { z } from 'zod';

export const getInboxMessages = (
  messageType: string
): Promise<IMessageResponse[]> =>
  client.get(`${MESSAGE_EP}/${messageType}`).then((response) => response.data);

export const composeMessage = (
  payload: z.infer<typeof formSchema>
): Promise<ApiResponse> =>
  client
    .post(`${MESSAGE_EP}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);

export const readMessage = (messageId: string): Promise<ApiResponse> =>
  client
    .get(`${MESSAGE_EP}/read/${messageId}`)
    .then((response) => response.data);
