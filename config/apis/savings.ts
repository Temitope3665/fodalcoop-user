import { savingsDepositSchema } from '@/components/forms/savings-deposit-form';
import client from '@/lib/axios-instance';
import { ApiResponse, IStandardSavingsData } from '@/types';
import { z } from 'zod';
import { SAVINGS_EP } from '../endpoints';

export const getStandardSavings = (
  savingsEP: string
): Promise<{ data: IStandardSavingsData[] }> =>
  client.get(savingsEP).then((response) => response.data);

export const depositSavings = (
  payload: z.infer<typeof savingsDepositSchema>
): Promise<ApiResponse> =>
  client
    .post(`${SAVINGS_EP}/deposit`, payload)
    .then((response) => response.data);