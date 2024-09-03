import { repaymentFormSchema } from '@/components/forms/loans/loan-repayment-form';
import { IUser, extendedLoanFormSchema } from '@/types';
import { z } from 'zod';
import { create } from 'zustand';

export const defaultUser = {
  email: '',
  id: '',
  member: {
    lastName: '',
    firstName: '',
    id: '',
    email: '',
    phone: '',
    residentialAddress: '',
    agency_id: '',
    member_account: {
      liability: '',
      savingBal: '',
      loanBal: '',
    },
  },
};

interface StoreState {
  count: number;
  increase: () => void;
  reset: () => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  currentLoanCreation: z.infer<typeof extendedLoanFormSchema> | null;
  currentLoanRepayment: z.infer<typeof repaymentFormSchema> | null;
  setCurrentLoanCreation: (
    loan: z.infer<typeof extendedLoanFormSchema> | null
  ) => void;
  setCurrentLoanRepayment: (
    loan: z.infer<typeof repaymentFormSchema> | null
  ) => void;
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
  user: defaultUser,
  setUser: (user) => set({ user }),
  currentLoanCreation: null,
  currentLoanRepayment: null,
  setCurrentLoanCreation: (currentLoanCreation) => set({ currentLoanCreation }),
  setCurrentLoanRepayment: (currentLoanRepayment) =>
    set({ currentLoanRepayment }),
}));

export default useStore;
