export const getHttpOnlyCookie = ({ cookieName }: { cookieName: string }) => {
  fetch("http://localhost:3000/api/getCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cookieName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // console.log(`data for get ${cookieName} cookie:`, data);
        console.log(`${JSON.stringify(data)}`);
      } else {
        console.log(data.cookieValue.name);
      }
    })
    .catch((error) =>
      console.error(`error for get ${cookieName} cookie:`, error)
    );
};
