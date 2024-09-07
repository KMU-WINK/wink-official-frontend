import { create } from 'zustand';

interface ApplicationState {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

export const useApplicationState = create<ApplicationState>((set) => ({
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
}));
