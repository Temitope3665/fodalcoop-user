import client from '@/lib/axios-instance';
import { LOAN_EP } from '../endpoints';

export const getRunningLoans = (): Promise<any[]> =>
  client.get(`${LOAN_EP}/running-loans`).then((response) => response.data);

export const getRepaymentRecord = (): Promise<{ data: any[] }> =>
  client.get(`${LOAN_EP}/loan-repayment`).then((response) => response.data);

export const getLoanApplications = (): Promise<{ data: any[] }> =>
  client.get(`${LOAN_EP}/loan-applications`).then((response) => response.data);

export const getLoanProfile = (): Promise<{ name: string; id: number }[]> =>
  client.get(`${LOAN_EP}/profile`).then((response) => response.data);

export const getLoanProducts = (
  profileId: string
): Promise<{ name: string; id: number; duration: number }[]> =>
  client
    .get(`${LOAN_EP}/product/${profileId}`)
    .then((response) => response.data);

export const getCustomPayments = (): Promise<{
  data: { id: number; amount: string; month: string }[];
  total: string;
}> =>
  client
    .get(`${LOAN_EP}/fetch-customRepayment`)
    .then((response) => response.data);

export const addCustomPayments = (payload: {
  amount: string;
  monthsTarget: string;
  principal: string;
}): Promise<any[]> =>
  client
    .post(`${LOAN_EP}/add-customPayment`, payload)
    .then((response) => response.data);

export const deleteCustomPayments = (id: string): Promise<any[]> =>
  client
    .delete(`${LOAN_EP}/remove-custom-repayment/${id}`)
    .then((response) => response.data);

export const addGuarantor = (payload: {
  guarantorId: string;
  guarantorAmount: string;
  total_loan: string;
}): Promise<any[]> =>
  client
    .post(`${LOAN_EP}/add-guarantors`, payload)
    .then((response) => response.data);

export const getLoanGuarantors = (): Promise<{
  loan_guarantor: {
    id: number;
    guarantor: number;
    liability: string;
    member: { firstName: string; lastName: string };
  }[];
}> =>
  client.get(`${LOAN_EP}/fetch-guarantors`).then((response) => response.data);

export const deleteLoanGuarantor = (id: string | number): Promise<any[]> =>
  client
    .delete(`${LOAN_EP}/remove-guarantors/${id}`)
    .then((response) => response.data);

export const submitLoanRequest = (payload: {
  loanProduct: string;
  paymentOption: string;
  amount: string;
  interest: string;
  totalAmount: string;
  loanProfile: string;
  monthlyRepayment: string;
  duration: string;
}): Promise<any[]> =>
  client.post(LOAN_EP, payload).then((response) => response.data);

export const getPaymentSchedule = (
  loanID: string | number
): Promise<{ amount: string; amt_paid: string; loan_id: number }[]> =>
  client
    .get(`${LOAN_EP}/fetch-payment-schedule/${loanID}`)
    .then((response) => response.data);

export const submitLoanRepaymentDeposit = (payload: {
  loanProfile: string | number;
  repaymentLog: string | number;
  amount: string | number;
  paymentOption: string;
  selectAccount: string | number;
  narration: string;
  file: any;
}): Promise<any[]> =>
  client
    .post(`${LOAN_EP}/submit-request`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
