
export const setHttpOnlyCookie = async ({
  cookieName,
  cookieData,
  options = {},
}: {
  cookieName: string;
  cookieData: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
}) => {
  // const response = await fetch("http://localhost:3000/api/setCookie", {
    const response = await fetch("https://httponlycookieeee.netlify.app/api/setCookie", {
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
