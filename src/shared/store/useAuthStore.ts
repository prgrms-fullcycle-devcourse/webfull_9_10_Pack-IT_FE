import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoggedin: boolean;
  setLogin: (token: string) => void;
  setLogout: () => void;
}

export const useAutuStore = create<AuthState>((set) => ({
  token: null,
  isLoggedin: false,
  setLogin: (token) => set({ token, isLoggedin: true }),
  setLogout: () => set({ token: null, isLoggedin: false }),
}));
