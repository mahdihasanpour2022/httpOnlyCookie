import { create } from "zustand";

type refreshTokenStore = {
  refreshToken: string | undefined;
  setRefreshToken: (data: string) => void;
};

export const useRefreshTokenDataStore = create<refreshTokenStore>()((set) => ({
  refreshToken: undefined,
  setRefreshToken: (data: string) => {
    set(() => ({
      refreshToken: data,
    }));
  },
}));

export const refreshTokenStore = useRefreshTokenDataStore.getState;
