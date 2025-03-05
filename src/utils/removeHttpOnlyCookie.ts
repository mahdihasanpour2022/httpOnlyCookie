export const removeHttpOnlyCookie = ({
  cookieName,
}: {
  cookieName: string;
}) => {
  fetch("http://localhost:3000/api/removeCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ cookieName}),
  })
    .then((response) => response.json())
    .then((data) => console.log(`data for remove ${cookieName} cookie:`, data))
    .catch((error) => console.error(`error for remove ${cookieName} cookie:`, error));
};
