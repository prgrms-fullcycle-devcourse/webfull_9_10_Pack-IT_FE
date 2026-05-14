import { create } from "zustand";

interface AuthState {
  nanoId: string | null;
  checkedLoggedin: boolean;
  setToken: (nanoId: string) => void;
  setLogin: (NanoId: string) => void;
  setLogout: () => void;
}

export const useAutuStore = create<AuthState>((set) => ({
  nanoId: null,
  checkedLoggedin: false,
  setToken: (nanoId) => set({ nanoId, checkedLoggedin: false }),
  setLogin: (nanoId) => set({ nanoId, checkedLoggedin: true }),
  setLogout: () => set({ nanoId: null, checkedLoggedin: false }),
}));
