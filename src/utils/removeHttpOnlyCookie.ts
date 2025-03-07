export const removeHttpOnlyCookie = async ({
  cookieName,
}: {
  cookieName: string;
}) => {
  // const response = await fetch("http://localhost:3000/api/removeCookie", {
    const response = await fetch("https://httponlycookieeee.netlify.app/api/removeCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ cookieName }),
  });
  const data = await response.json();
  return data;
};
