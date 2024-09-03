import client from '@/lib/axios-instance';
import { IGuarantorData } from '@/types';
import { LOAN_GUARANTOR_EP } from '../endpoints';

export const getGuarantors = (
  type: string
): Promise<{ data: IGuarantorData[] }> =>
  client.get(`${LOAN_GUARANTOR_EP}/${type}`).then((response) => response.data);

export const getAllGuarantors = (): Promise<{ data: any[] }> =>
  client.get('/loan/fetch-guarantors').then((response) => response.data);

export const updateRequest = (
  type: string,
  guarantorId: string | number
): Promise<{ data: any[] }> =>
  client
    .get(`${LOAN_GUARANTOR_EP}/${type}/${guarantorId}`)
    .then((response) => response.data);

export const negotiateRequest = async (payload: {
  amount: string;
  guarantorId: string;
}): Promise<{ data: any[] }> => {
  const { guarantorId, amount } = payload;
  return client
    .post(`${LOAN_GUARANTOR_EP}/update/${guarantorId}`, { amount })
    .then((response) => response.data);
};
