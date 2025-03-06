"use server";

import { cookies } from "next/headers";

export async function getHttpOnlyCookieeeee(cookieName: string) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(cookieName);

  if (!cookieValue) {
    return {
      isSuccess: false,
      status: 404,
      message: `کوکی با نام ${cookieName} وجود ندارد.`,
      data: null,
    };
  }

  return {
    isSuccess: true,
    status: 200,
    message: "کوکی با موفقیت دریافت شد.",
    data: {
      cookieName,
      cookieValue: JSON.parse(cookieValue.value),
    },
  };
}
