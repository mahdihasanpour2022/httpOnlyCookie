import Cookies from "universal-cookie";

export const universalCookieHandler = () => {
  const cookies = new Cookies();
  cookies.set("universalCookies", "data for universalCookies", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
};
