import { create } from "zustand";

interface AuthState {
  nanoId: string | null;
  checkedLoggedin: boolean;
  isKakao: boolean; // 카카오 로그인 여부 저장
  setToken: (nanoId: string) => void;
  setLogin: (nanoId: string) => void;
  setLogout: () => void;
}

export const useAutuStore = create<AuthState>((set) => ({
  nanoId: null,
  checkedLoggedin: false,
  isKakao: false,
  setToken: (nanoId) => set({ nanoId, checkedLoggedin: false, isKakao: false }),
  setLogin: (nanoId) => set({ nanoId, checkedLoggedin: true, isKakao: true }),
  setLogout: () => set({ nanoId: null, checkedLoggedin: false, isKakao: false }),
}));