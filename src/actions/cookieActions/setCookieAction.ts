"use server";

import { ServerActionResponse } from "@/interfaces/serverActionResponse";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function setCookieAction({
  name,
  value,
  httpOnly = true,
  secure = process.env.NEXT_PUBLIC_ENV === 'development' ? false : true,
  sameSite = process.env.NEXT_PUBLIC_ENV === 'development' ?  "lax" :"strict" ,
  path = "/",
  maxAge = 60 * 60 * 24 * 7,
  expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
}: ResponseCookie): Promise<ServerActionResponse> {
  try {
    const cookieStore = await cookies();

    if (!name || !value) {
      return {
        isSuccess: false,
        status: 400,
        message: "نام و مقدار کوکی الزامی است",
        data: null,
      };
    }

    cookieStore.set({
      name,
      value,
      httpOnly,
      secure,
      sameSite,
      path,
      maxAge,
      expires,
    });

    return {
      isSuccess: true,
      status: 200,
      message: "کوکی با موفقیت ست شد",
      data: null,
    };
  } catch (error) {
    console.log("خطا در تنظیم کوکی:", error);
    return {
      isSuccess: false,
      status: 500,
      message: "خطایی در تنظیم کوکی رخ داد",
      data: null,
    };
  }
}
