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
  await fetch("http://localhost:3000/api/setCookie", {
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
  })
    .then((response) => response.json())
    .then((data) => console.log(`data for set ${cookieName} cookie:`, data))
    .catch((error) =>
      console.error(`error for set ${cookieName} cookie:`, error)
    );
};
