import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cookieName } = await request.json();

    if (!cookieName) {
      return NextResponse.json(
        { error: "Cookie name and data are required." },
        { status: 400 }
      );
    }

    // Set the cookie
    const response = NextResponse.json({
      message: "Cookie delete successfully",
      cookieName,
    });

    response.cookies.delete(cookieName);

    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json(
      { error: "Failed to set cookie. Please check your request." },
      { status: 500 }
    );
  }
}