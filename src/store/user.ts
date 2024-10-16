import { MemberType } from '@/lib/wink-api';

import { create } from 'zustand';

interface useStoreType {
  fetching: boolean;
  user: null | MemberType;
  setUser: (user: null | MemberType) => void;
}

const useUserStore = create<useStoreType>((set) => ({
  fetching: true,
  user: null,
  setUser: (user) => set({ user, fetching: false }),
}));

export default useUserStore;
