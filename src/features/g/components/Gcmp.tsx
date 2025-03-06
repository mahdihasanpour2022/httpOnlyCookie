"use client";
// import { useCookie } from "@/providers/CookieContextProvider";
import { useRefreshTokenInitializerStore } from "@/store/useRefreshTokenInitializerStore";

const Gcmp = () => {

  // with context
  // const { cookie } = useCookie();
  // console.log("Fcmp refreshToken :", cookie);

  // with zustand
  const cookie = useRefreshTokenInitializerStore((state) => state.cookie);
  // console.log("Fcmp refreshToken :", cookie);

  return (
    <>
      <div className="text-center font-bold">
        {cookie ? cookie : "رفرش توکن رو نداریم"}
      </div>
    </>
  );
};

export default Gcmp;
