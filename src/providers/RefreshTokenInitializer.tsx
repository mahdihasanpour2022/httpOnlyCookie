"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRefreshTokenInitializerStore } from "@/store/useRefreshTokenInitializerStore";

const RefreshTokenInitializer = () => {
  const pathname = usePathname();
  const { fetchRefreshCookie } = useRefreshTokenInitializerStore();

  useEffect(() => {
    fetchRefreshCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
};

export default RefreshTokenInitializer;
