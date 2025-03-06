"use client";

import { ApiResponse } from "@/interfaces/apiResponse";
import { RefreshTokenData } from "@/interfaces/refreshTokenData";
import { getHttpOnlyCookie } from "@/utils/getHttpOnlyCookie";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const CookieContext = createContext(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CookieContextProvider = ({ children }: any) => {
  const [cookie, setCookie] = useState<string | undefined>(undefined);
  const pathname = usePathname();

  const fetchRefreshCookie = async () => {
    const data: ApiResponse<RefreshTokenData> = await getHttpOnlyCookie({
      cookieName: "refreshToken",
    });
    console.log("CookieProvider :", data);
    if (data.isSuccess) {
      setCookie(data.data.cookieValue.refreshToken);
    } else {
      setCookie(undefined);
    }
  };

  useEffect(() => {
    fetchRefreshCookie();
  }, [pathname]);

  return (
    <CookieContext.Provider value={{ cookie, setCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => useContext(CookieContext);
