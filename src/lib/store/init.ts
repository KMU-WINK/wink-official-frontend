import { create } from 'zustand';

interface InitStore {
  isInit: boolean;
  setInit: (value: boolean) => void;
}

export const useInitStore = create<InitStore>((set) => ({
  isInit: false,
  setInit: (isInit) => set({ isInit }),
}));
