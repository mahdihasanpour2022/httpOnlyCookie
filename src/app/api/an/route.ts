import { NextRequest } from "next/server";
import { headers, cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const myHeaders = new Headers(request.headers);
  console.log("a10",myHeaders.get("Authorization"));

  const headersList = await headers();
  console.log("a20",headersList.get("Authorization"));

  (await cookies()).set("age", "20");
  console.log("a30",(await cookies()).get("age"), "age");

  console.log("a40",request.cookies.get("theme"), "theme");
  return new Response("<h1>api پروفایل</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
