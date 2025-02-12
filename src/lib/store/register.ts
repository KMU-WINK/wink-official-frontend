import { create } from 'zustand';

interface RegisterStore {
  confetti: boolean;
  setConfetti: (confetti: boolean) => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  confetti: false,
  setConfetti: (confetti) => set({ confetti }),
}));
