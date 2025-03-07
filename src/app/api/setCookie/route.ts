import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cookieName, cookieData, options } = await request.json();

    if (!cookieName || !cookieData) {
      return NextResponse.json({
        isSuccess: false,
        status: 400,
        message: "نام و دیتای کوکی را وارد نکرده اید..",
        data: null,
      });
    }

    const {
      httpOnly = true,
      secure = process.env.NEXT_PUBLIC_ENV === 'development' ? false : true,
      sameSite = process.env.NEXT_PUBLIC_ENV === 'development' ? false : true
        ? "strict"
        : "lax",
      path = "/",
      maxAge = 60 * 60 * 24 * 7,
    } = options || {};

    const response = NextResponse.json({
      isSuccess: true,
      status: 200,
      message: `کوکی با نام ${cookieName} با موفقیت ایجاد شد.`,
      data: null,
    });

    response.cookies.set(cookieName, JSON.stringify(cookieData), {
      httpOnly,
      secure,
      sameSite,
      path,
      maxAge,
    });

    // const cookieValue = JSON.stringify(cookieData);
    // response.headers.set(
    //   "Set-Cookie",
    //   `${cookieName}=${cookieValue}; HttpOnly; Path=${path}; Max-Age=${maxAge}; Secure=${secure}; SameSite=${sameSite}`
    // );

    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json({
      isSuccess: false,
      status: 500,
      message: `کوکی ایجاد نشد.`,
      data: null,
    });
  }
}
