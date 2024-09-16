import { create } from 'zustand';

interface ApplicationState {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
  refreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
}

export const useApplicationState = create<ApplicationState>((set) => ({
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
  refreshing: false,
  setRefreshing: (refreshing) => set({ refreshing }),
}));
