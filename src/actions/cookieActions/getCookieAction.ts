"use server";
import { ServerActionResponse } from "@/interfaces/serverActionResponse";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getCookieAction(
  name: string
): Promise<ServerActionResponse> {
  try {
    const cookieStore = await cookies();
    const cookieValue: RequestCookie | undefined = cookieStore.get(name);

    if (!cookieValue) {
      return {
        isSuccess: false,
        status: 404,
        message: "کوکی به این نام وجود ندارد",
        data: null,
      };
    }

    let parsedData : string | object;
    try {
      parsedData = JSON.parse(cookieValue.value);
    } catch {
      parsedData = cookieValue.value;
    }

    return {
      isSuccess: true,
      status: 200,
      message: "اطلاعات کوکی با موفقیت دریافت شد",
      data: parsedData,
    };
  } catch (error) {
    console.error("خطا در دریافت کوکی:", error);
    return {
      isSuccess: false,
      status: 500,
      message: "خطایی در دریافت کوکی رخ داد",
      data: null,
    };
  }
}
