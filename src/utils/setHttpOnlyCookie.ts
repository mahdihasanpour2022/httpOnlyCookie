import { OptionCookie } from "@/interfaces/optionCookie";

export const setHttpOnlyCookie = async ({
  cookieName,
  cookieData,
  options = {},
}: {
  cookieName: string;
  cookieData: object;
  options?: OptionCookie;
}) => {
  const response = await fetch("http://localhost:3000/api/setCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      cookieName,
      cookieData,
      options,
    }),
  });
  const data = await response.json();
  console.log("setHttpOnlyCookie ruuuned ...", cookieName , data);
  return data;
};
