import { Stack } from '@/app/recruit/form/_component/StackButton';

import { RecruitFormRequest } from '@/api/type/domain/recruit';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Data {
  confetti: boolean;
  step: number;
  data?: RecruitFormRequest;
  modify?: number;
  developer: boolean;
  stack: Stack[];
  back: boolean;
}

interface Action {
  clear: () => void;
  setConfetti: (confetti: boolean) => void;
  setStep: (step: number) => void;
  setData: (data: RecruitFormRequest) => void;
  setModify: (modify: number | undefined) => void;
  setDeveloper: (developer: boolean) => void;
  setStack: (stack: Stack[]) => void;
  setBack: (back: boolean) => void;
}

const initialState: Data = {
  confetti: false,
  step: 0,
  data: undefined,
  modify: undefined,
  developer: false,
  stack: [],
  back: false,
};

export const useRecruitStore = create(
  persist<Data & Action>(
    (set) => ({
      ...initialState,
      clear: () => set({ ...initialState }),
      setConfetti: (confetti) => set({ confetti }),
      setStep: (step) => set({ step }),
      setData: (data: RecruitFormRequest) => set({ data }),
      setModify: (modify: number | undefined) => set({ modify }),
      setDeveloper: (developer: boolean) => set({ developer }),
      setStack: (stack: Stack[]) => set({ stack }),
      setBack: (back: boolean) => set({ back }),
    }),
    {
      name: 'recruit',
    },
  ),
);
