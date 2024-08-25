import client from '@/lib/axios-instance';
import { IGuarantorData } from '@/types';
import { LOAN_GUARANTOR_EP } from '../endpoints';

export const getGuarantors = (
  type: string
): Promise<{ data: IGuarantorData[] }> =>
  client.get(`${LOAN_GUARANTOR_EP}/${type}`).then((response) => response.data);
