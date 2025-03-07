"use server";

import { cookies } from "next/headers";

interface Prop {
  cookieName: string;
  cookieData: object;
}

export async function setHttpOnlyCookieeeee({ cookieName, cookieData }: Prop) {
  const cookieStore =await cookies();

  cookieStore.set(cookieName, JSON.stringify(cookieData), {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === 'development' ? false : true,
    sameSite: process.env.NEXT_PUBLIC_ENV === 'development' ?  "lax" :"strict" ,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    isSuccess: true,
    status: 200,
    message: `کوکی ${cookieName} با موفقیت ست شد.`,
    data: null,
  };
}