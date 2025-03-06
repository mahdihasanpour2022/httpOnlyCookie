"use server";
// import { getHttpOnlyCookieeeee } from "@/actions/getHttpOnlyCookieeeee";
import Fcmp from "@/features/f/components/Fcmp";
// import { setHttpOnlyCookie } from "@/utils/setHttpOnlyCookie";
// import { getHttpOnlyCookie } from "@/utils/getHttpOnlyCookie";
// import { setHttpOnlyCookie } from "@/utils/setHttpOnlyCookie";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  //--------------------------------------------------------------------------- get client cookie in ssr cmp with next/headers
  // const allCookies = cookieStore.getAll();
  // console.log("همه کوکی هایی که سمت سرور داریم میگیریم  :", allCookies);

  //  دو روش  برای گرفتن کوکی سمت سرور
  // next/headers  => روش 1
  const ssrCookie = cookieStore.get("refreshToken");
  const cookieValue = ssrCookie?.value
    ? JSON.parse(ssrCookie.value)
    : undefined;


  // server action  => روش 2
  // با این روش هم میشه با سرور اکشن سمت سرور کوکی رو گرفت
  // const refreshTokenData = await getHttpOnlyCookieeeee("refreshToken");
  // console.log("annnnnn 1000", refreshTokenData);

  // console.log(
  //   "یک کوکی از نوع httpOnly رو اینجا سمت سرور با next/header گرفتیم :",
  //   cookieValue
  // );

  // -------------------------------------------------------------------------------------------------------------
  // ایجاد کوکی سمت سرور و دریافت  ان از دو طریق زیر نشدنی است.
  // await setHttpOnlyCookie({
  //   cookieName: "a-ssr-cookie",
  //   cookieData: { name: "gholam-hosein" },
  // });

  // console.log(
  //   "we create a httpOnly cookie named a-ssr-cookie with send req to our server and say successfully created but cant get it by send req to our server",
  //   getHttpOnlyCookie({ cookieName: "a-ssr-cookie" })
  // );

  // const ssrCookie1 = cookieStore.get("a-ssr-cookie");
  // const cookieValue2 = ssrCookie1?.value
  //   ? JSON.parse(ssrCookie1.value)
  //   : undefined;
  // console.log(
  //   "we create a httpOnly cookie named a-ssr-cookie with send req to our server and say successfully created but cant get it by next/header directly here in server parent cmp",
  //   cookieValue2
  // );

  // --------------------------------------------------------------------------------------------------
  // ---------------------------------------   سه مورد ممنوعه ----------------------------------------
  // --------------------------------------------------------------------------------------------------

  // 1   -------------------------------------------------------------------------------------------------------------
  // next/header  مستقیم با این نمیشه سمت سرور ست کرد
  // httpOnly حتی در کامپوننتی که سرور است نمیتوانیم مستقیم یه کوکی ست کنیم از نوع
  //  Error: Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options
  // cookieStore.set("aslll", JSON.stringify({ name: "pppp" }), {
  //   httpOnly: true,
  //   secure: process.env.NEXT_PUBLIC_ENV === "production",
  //   sameSite: process.env.NEXT_PUBLIC_ENV === "production" ? "strict" : "lax",
  //   path: "/",
  //   maxAge: 60 * 60 * 24 * 7,
  // });

  // const ssrCookie1 = cookieStore.get("aslll");
  // const cookieValue2 = ssrCookie1?.value
  //   ? JSON.parse(ssrCookie1.value)
  //   : undefined;
  // console.log("3 :", cookieValue2);

  //  2 ---------------------------------------------------------------------------
  // httpOnly = false ==>  امکان ست کردن این نوع کوکی سمت سرور نیست
  // await setHttpOnlyCookie({
  //   cookieName: "10",
  //   cookieData: { name: "10" },
  //   options: {
  //     path: "/",
  //     secure: false,
  //     httpOnly: false,
  //     sameSite: "lax", // lax strict
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  //   },
  // });

  // 3  ---------------------------------------------------------------------------
  // universal ==>  با یونیورسال سمت سرور نمیشه کوکی ست کرد
  // نه httpOnly = trye  و نه httpOnly =false
  // const cookie = new Cookies(); //  universal
  // cookie.set(
  //   "csrCookie _ set in ssr",
  //   { name: "asghar" },
  //   {
  //     path: "/",
  //     secure: false,
  //     httpOnly: false,
  //     sameSite: "strict", // lax strict
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  //   }
  // );

  return <Fcmp name={cookieValue?.name ? cookieValue.name : undefined} />;
};

export default page;
