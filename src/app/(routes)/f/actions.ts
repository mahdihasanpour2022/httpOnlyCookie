"use server";

import { cookies } from "next/headers";

export async function create() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "name",
    value: "lee",
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === "production",
    sameSite: process.env.NEXT_PUBLIC_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
