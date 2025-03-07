import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Cookie has been set!' });

  // تنظیم کوکی با هدر Set-Cookie
  response.cookies.set('test', 'some_value', {
    httpOnly: true, // فقط از سمت HTTP در دسترس است
    secure: process.env.NODE_ENV === 'production', // فقط در محیط تولید از https استفاده می‌شود
    maxAge: 60 * 60 * 24, // کوکی به مدت 1 روز معتبر است
    path: '/', // مسیر معتبر
  });

  return response;
}
