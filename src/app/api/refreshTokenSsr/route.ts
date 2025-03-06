import Axios from "axios";
import {  NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // const cookieStore = await cookies();
    // const refreshTokenCookie = cookieStore.get("refreshToken");
    // const { refreshToken } = refreshTokenCookie
    //   ? JSON.parse(refreshTokenCookie.value)
    //   : null;

    const body = await req.json();
    const { refreshToken = "" } = body;
    console.log("demble in refreshTokenSsr:",refreshToken)
    if (!refreshToken) {
      return NextResponse.json({
        isSuccess: false,
        status: 400,
        message: "رفرش توکن برای فرایند رفرش توکن یافت نشد",
        data: null,
      });
    }
    console.log("300", refreshToken);

    const response = await Axios.post(
      "https://kidzyshop.podland.ir/shop/api/account/refresh-token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          refreshToken: refreshToken,
        },
        withCredentials: true,
      }
    );
    console.log("response :", response);
    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data.singleResult || {};
      if (accessToken && refreshToken) {
        return NextResponse.json({
          isSuccess: true,
          status: 200,
          message: "فرایند رفرش توکن موفق بود",
          data: { accessToken, refreshToken },
        });
      }
    }

    return NextResponse.json({
      isSuccess: false,
      status: 500,
      message: "خطای داخلی ",
      data: null,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error in API route:", error);
    return NextResponse.json({
      isSuccess: false,
      status: 500,
      message: "خطای داخلی سرور",
      data: null,
    });
  }
}
