export const getHttpOnlyCookie = ({ cookieName }: { cookieName: string }) => {
  fetch("http://localhost:3000/api/getCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ cookieName }),
  })
    .then((response) => response.json())
    .then((data) => console.log(`data for get ${cookieName} cookie:`, data))
    .catch((error) =>
      console.error(`error for get ${cookieName} cookie:`, error)
    );
};
