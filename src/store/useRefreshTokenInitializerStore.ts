import { create } from "zustand";
import { ApiResponse } from "@/interfaces/apiResponse";
import { RefreshTokenData } from "@/interfaces/refreshTokenData";
import { getHttpOnlyCookie } from "@/utils/getHttpOnlyCookie";

interface CookieState {
  cookie: string | undefined;
  fetchRefreshCookie: () => Promise<void>;
}

export const useRefreshTokenInitializerStore = create<CookieState>((set) => ({
  cookie: undefined,

  fetchRefreshCookie: async () => {
    try {
      // console.log("useRefreshTokenInitializerStore runned")
      const data: ApiResponse<RefreshTokenData> = await getHttpOnlyCookie({
        cookieName: "refreshToken",
      });

      // console.log("Zustand Cookie Store:", data);

      if (data.isSuccess) {
        set({ cookie: data.data.cookieValue.refreshToken });
      } else {
        set({ cookie: undefined });
      }
    } catch (error) {
      console.error("Error fetching refresh cookie:", error);
      set({ cookie: undefined });
    }
  },
}));