import { create } from 'zustand';

interface IUser {
  email: string;
  id: string;
  member: { lastName: string; firstName: string };
}

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
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;
