"use client"
// import { useRefreshTokenDataStore } from "@/stores/useRefreshTokenDataStore";
import { useCookie } from "@/providers/CookieContext";

const Gcmp = () => {

    // const refreshToken = useRefreshTokenDataStore((state) => state.refreshToken);
    //  const { refreshToken } = refreshTokenStore();
    // console.log("refreshToken in GCmp", refreshToken);

    
      const { cookie } = useCookie();
      console.log("coolie :", cookie);

  return (
    <>
      <p>salam g</p>
    </>
  );
};

export default Gcmp;
