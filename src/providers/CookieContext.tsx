"use client";

import { getHttpOnlyCookie } from "@/utils/getHttpOnlyCookie";
import { createContext, useContext, useState } from "react";

const CookieContext = createContext(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CookieProvider = ({ initialCookie, children }: any) => {
  const [cookie, setCookie] = useState(initialCookie);

  // useEffect(() => {
  //   const fetchCookie =  () => {
  //     const res =  getHttpOnlyCookie({ cookieName: "refreshToken" });
  //     console.log("res", res);
  //     setCookie(res);
  //   };

  //   fetchCookie();
  // }, []);
  getHttpOnlyCookie({ cookieName: "refreshToken" });

  return (
    <CookieContext.Provider value={{ cookie, setCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => useContext(CookieContext);
