import { create } from "zustand";

type CookieState = {
  cookie: string | null;
  setCookie: (value: string) => void;
};

export const useCookieStore = create<CookieState>((set) => ({
  cookie: null,
  setCookie: (value) => set({ cookie: value }),
}));