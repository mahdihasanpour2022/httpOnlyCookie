import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { cookieName } = await request.json();

    if (!cookieName) {
      return NextResponse.json({
        isSuccess: false,
        status: 400,
        message: "نام کوکی را  برای گرفتن اطلاعات آن وارد نکرده اید",
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

    return NextResponse.json({
      isSuccess: true,
      status: 200,
      message: "کوکی با موفقیت دریافت شد.",
      data: {
        cookieName,
        cookieValue: JSON.parse(cookieValue.value),
      },
    });
  } catch (error) {
    console.error("Error retrieving cookie:", error);
    return NextResponse.json({
      isSuccess: false,
      status: 500,
      message: "دریافت کوکی ناموفق بود.",
      data: null,
    });
  }
}
