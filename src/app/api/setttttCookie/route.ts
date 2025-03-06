import { NextRequest, NextResponse } from "next/server";
import { setHttpOnlyCookieeeee } from "@/actions/setHttpOnlyCookieeeee";

export async function POST(request: NextRequest) {
  const { cookieName, cookieData } = await request.json();

  if (!cookieName || !Object.keys(cookieData).length ) {
    return NextResponse.json({
      isSuccess: false,
      status: 400,
      message: "نام یا داده کوکی مشخص نشده است.",
      data: null,
    });
  }

  const result = await setHttpOnlyCookieeeee({ cookieName, cookieData });

  return NextResponse.json(result);
}