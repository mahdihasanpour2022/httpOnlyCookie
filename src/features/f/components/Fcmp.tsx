"use client";
// import Cookies from "universal-cookie";
import { setHttpOnlyCookie } from "@/utils/setHttpOnlyCookie";
import { getHttpOnlyCookie } from "@/utils/getHttpOnlyCookie";
import { removeHttpOnlyCookie } from "@/utils/removeHttpOnlyCookie";
import { universalCookieHandler } from "@/utils/universalCookieHandler";
import { useRefreshTokenDataStore } from "@/stores/useRefreshTokenDataStore";

const Fcmp = ({ name }: { name: string | null }) => {
  // const cookies = new Cookies();
  // const csrAllCookies = cookies.getAll();
  // console.log(
  //   "تمام کوکیهای قابل مشاهده سمت کلاینت با یونیورسال :",
  //   csrAllCookies
  // );

  const refreshToken = useRefreshTokenDataStore((state) => state.refreshToken);
  console.log("refreshToken get in client by zustand", refreshToken);

  return (
    <>
      <div className="border-b w-fll py-6 border-gray-400 text-center h-32 flex flex-col">
        {`یک کوکی از نوع`}
        <span className="">httpOnly</span>
        {`در سمت کامپوننت والدش گرفتیم و بعنوان پراپ پاس دادیم اینجا که کلاینته که مقدارش اینه :`}
        <span>{name}</span>
      </div>
      <div className="flex w-full px-4 items-center justify-center mt-4">
        {/*  ----------------------------------- data ----------------------------- */}
        <div className="opacity-20 w-1/2">
          <div className="pb-6">
            <p>{`in csr ==> :`}</p>
            <p className="pl-20">{` set :`}</p>
            <p className="pl-32">
              {` (httpOnly = false) + universal `}
              <span className="font-medium border p-1 border-gray-400">
                &#10003;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = false) + next/header `}
              <span className="font-medium border p-1 border-gray-400">
                &#10006;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = true) + api route + universal `}
              <span className="font-medium border p-1 border-gray-400">
                &#10006;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = true) + api route + next/header `}
              <span className="font-medium border p-1 border-gray-400">
                &#10003;
              </span>
            </p>
            {/* ----------------------------------------------------------------------------- */}
            <p className="pl-20">{` get :`}</p>
            <p className="pl-32">
              {` (httpOnly = false) + universal `}
              <span className="font-medium border p-1 border-gray-400">
                &#10003;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = false) + next/header `}
              <span className="font-medium border p-1 border-gray-400">
                &#10006;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = true) +  universal `}
              <span className="font-medium border p-1 border-gray-400">
                &#10006;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = true) + api route + next/header `}
              <span className="font-medium border p-1 border-gray-400">
                &#10003;
              </span>
            </p>
          </div>
          <div className="">
            <p>{`in ssr ==> :`}</p>
            <p className="pl-20">{` set :`}</p>
            <p className="pl-32">
              {` (httpOnly = false) + universal `}
              <span className="font-bold border p-1 border-black">
                &#10006;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = true) + api route + next/header `}
              <span className="font-bold border p-1 border-black">
                &#10006;
              </span>
            </p>
            <p className="pl-20">{` get :`}</p>
            <p className="pl-32">
              {` (httpOnly = false) + universal `}
              <span className="font-medium border p-1 border-gray-400">
                &#10006;
              </span>
            </p>
            <p className="pl-32">
              {` (httpOnly = true) + api route + next/header `}
              <span className="font-medium border p-1 border-gray-400">
                &#10003;
              </span>
            </p>
          </div>
        </div>
        {/*  ---------------------------------- buttons ---------------------------- */}
        <div className="w-1/3 flex flex-col gap-12">
          <div className="w-full border border-gray-300 p-1 flex flex-col gap-1">
            <p className="mx-auto text-center">
              از طریق این 4 دکمه میتوانیم سمت کلاینت با درخواست زدن به سمت سرور
              کوکی رو ست ، گت ،حذف و یا تغییر بدیم از نوع{" "}
            </p>
            <span className="mx-auto">httpOnly</span>
            <button
              type="button"
              onClick={() =>
                setHttpOnlyCookie({
                  cookieName: "ssrCookie _ set in csr",
                  cookieData: { name: "jafar" },
                })
              }
              className="border border-black py-1 px-4"
            >
              set httpOnly cookie in csr
            </button>
            <button
              type="button"
              onClick={() =>
                setHttpOnlyCookie({
                  cookieName: "ssrCookie _ set in csr",
                  cookieData: { name: "asghar" },
                })
              }
              className="border border-black py-1 px-4"
            >
              change httpOnly cookie data in csr
            </button>
            <button
              type="button"
              onClick={() =>
                getHttpOnlyCookie({ cookieName: "ssrCookie _ set in csr" })
              }
              className="border border-black py-1 px-4"
            >
              get httpOnly cookie with api route
            </button>
            <button
              type="button"
              onClick={() =>
                removeHttpOnlyCookie({ cookieName: "ssrCookie _ set in csr" })
              }
              className="border border-red-500 text-red-500 py-1 px-4"
            >
              remove httpOnly cookie data in csr
            </button>
          </div>
          <div className="w-full border border-gray-300 p-1 flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                setHttpOnlyCookie({
                  cookieName: "refreshToken",
                  cookieData: {
                    refreshToken: "14Bd892f69f04aa7b89525a838407f1d.XzIwMjUx",
                  },
                })
              }
              className="border border-gray-300 text-gray-300 py-1 px-4"
            >
              create refreshToken cookie
            </button>
            <button
              type="button"
              onClick={() =>
                removeHttpOnlyCookie({ cookieName: "refreshToken" })
              }
              className="border border-red-200 text-red-200 py-1 px-4"
            >
              remove refreshToken cookie
            </button>
          </div>
          <button
            type="button"
            onClick={() => getHttpOnlyCookie({ cookieName: "a-ssr-cookie" })}
            className="border border-gray-500 py-1 px-4 flex flex-col"
          >
            {`یک کوکی سمت سرور ساختیم`}
            <span>{`httpOnly`}</span>
            {`و پیام موفق هم داد و اینجا داریم میگیریمش اما نمیشه یعنی یا ساخته نشده یا نمیشه گرفتش بنام`}
            <span>{`a-ssr-cookie`}</span>
          </button>
          <button
            type="button"
            onClick={universalCookieHandler}
            className="border border-gray-500 text-gray-500 py-1 px-4 flex flex-col"
          >
            {`با کلیک روی این دکمه میخواهیم  با یونیورسال سمت کلاینت یک کوکی بسازیم اما نمیشه از نوع`}
            <span>{`httpOnly`}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Fcmp;
