import { create } from 'zustand';

import { User } from '@/api';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) =>
    set(() => ({
      user,
    })),
}));
