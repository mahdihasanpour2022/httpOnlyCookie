import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { cookieName } = await request.json();

    if (!cookieName) {
      return NextResponse.json({
        isSuccess: false,
        status: 400,
        message: "نام کوکی را  برای حذف آن وارد نکرده اید.",
        data: null,
      });
    }

    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(cookieName);
    if (!cookieValue) {
      return NextResponse.json({
        isSuccess: false,
        status: 404,
        message: `کوکی با نام ${cookieName} وجود ندارد.`,
        data: null,
      });
    }

    const response = NextResponse.json({
      isSuccess: true,
      status: 200,
      message: `کوکی با نام ${cookieName} با موفقیت حذف شد.`,
      data: null,
    });

    response.cookies.delete(cookieName);

    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json({
      isSuccess: false,
      status: 500,
      message: `حذف کوکی ناموفق بود.`,
      data: null,
    });
  }
}
