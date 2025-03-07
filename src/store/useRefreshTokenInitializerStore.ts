import { create } from "zustand";
// import { ApiResponse } from "@/interfaces/apiResponse";
// import { RefreshTokenData } from "@/interfaces/refreshTokenData";
// import { getHttpOnlyCookie } from "@/utils/getHttpOnlyCookie";
import { getCookieAction } from "@/actions/cookieActions/getCookieAction";
import { ServerActionResponse } from "@/interfaces/serverActionResponse";

interface CookieState {
  cookie: string | undefined;
  fetchRefreshCookie: () => Promise<void>;
}

export const useRefreshTokenInitializerStore = create<CookieState>((set) => ({
  cookie: undefined,

  fetchRefreshCookie: async () => {
    try {
      const data :ServerActionResponse = await getCookieAction("refreshToken");

      console.log("==============>", data);

      if (data.isSuccess) {
        set({ cookie: data.data?.refreshToken });
      } else {
        set({ cookie: undefined });
      }
    } catch (error) {
      console.error("Error fetching refresh cookie:", error);
      set({ cookie: undefined });
    }
  },
}));
