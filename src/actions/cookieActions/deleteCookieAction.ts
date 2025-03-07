"use server";
import { ServerActionResponse } from "@/interfaces/serverActionResponse";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function deleteCookieAction(
  name: string
): Promise<ServerActionResponse> {
  try {
    const cookieStore = await cookies();
    const cookieValue: RequestCookie = cookieStore.get(name);

    if (!cookieValue) {
      return {
        isSuccess: false,
        status: 404,
        message: `کوکی به این نام وجود ندارد.`,
        data: null,
      };
    }

    cookieStore.delete(name);

    return {
      isSuccess: true,
      status: 200,
      message: "کوکی با موفقیت حذف شد",
      data: null,
    };
  } catch (error) {
    console.error("خطا در حذف کوکی:", error);
    return {
      isSuccess: false,
      status: 500,
      message: "خطایی در حذف کوکی رخ داد.",
      data: null,
    };
  }
}
