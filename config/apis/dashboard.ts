import client from '@/lib/axios-instance';
import { BANK_EP, LOAN_GUARANTOR_EP, MESSAGE_EP } from '../endpoints';
import { ApiResponse, IBank, IMessageResponse } from '@/types';
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

export const getDashboardGuarantorRequest = (): Promise<{
  data: { name: string; phone: string; liability: string; id: number }[];
}> =>
  client
    .get(`${LOAN_GUARANTOR_EP}/incoming-home`)
    .then((response) => response.data);

export const getBanks = (): Promise<IBank[]> =>
  client.get(BANK_EP).then((response) => response.data);
