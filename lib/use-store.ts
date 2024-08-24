import { IUser } from '@/types';
import { create } from 'zustand';

const defaultUser = {
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
  },
};

interface StoreState {
  count: number;
  increase: () => void;
  reset: () => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
  user: defaultUser,
  setUser: (user) => set({ user }),
}));

export default useStore;
