import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ message: 'Cookie has been set!' });

    // تنظیم کوکی
    response.cookies.set('test', 'some_value', {
      httpOnly: true, // فقط از سمت HTTP در دسترس است
      secure: process.env.NEXT_PUBLIC_ENV === 'development' ? false : true, // در حالت تولید باید secure باشد
      maxAge: 60 * 60 * 24, // کوکی به مدت 1 روز معتبر است
      path: '/', // مسیر معتبر
    });

    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json({ message: 'Error setting cookie.' }, { status: 500 });
  }
}