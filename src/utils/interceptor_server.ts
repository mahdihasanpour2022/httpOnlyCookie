import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { ApiRoutes } from "@/config/apiRoutes";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getCookieAction } from "@/actions/cookieActions/getCookieAction";

const API: AxiosInstance = Axios.create({
  // baseURL: Config.APIURL,
  baseURL: "https://kidzyshop.podland.ir/shop/api",
  timeout: 30000,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }), // indices: false  https://www.npmjs.com/package/qs
  },
});
interface AxiosErrorProps extends AxiosError {
  config: AxiosError["config"] & {
    _retry: boolean;
  };
}

const requestHandler = async (
  request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  if (!!!request.headers["Accept"]) {
    request.headers["Accept"] = "application/json";
  }

  if (!!!request.headers["Content-Type"]) {
    request.headers["Content-Type"] = "application/json";
  }

  const userDataCookie = await getCookieAction("userData");
  const userCookie = userDataCookie.data;

  if (
    userCookie &&
    userCookie?.userLoginData?.accessToken &&
    !request.headers.accessToken
  ) {
    console.log("5555 :", userCookie.userLoginData?.accessToken);
    request.headers["accessToken"] = `${userCookie.userLoginData.accessToken}`;
  }

  // const cookieStore = await cookies(); // dont use universal in ssr
  // const { userLoginData } = JSON.parse(
  //   cookieStore.get("userData")?.value || "{}"
  // );

  // console.log("454545 :", userLoginData?.accessToken);
  // if (userLoginData && userLoginData?.accessToken) {
  //   console.log("4444 :", userLoginData?.accessToken);
  //   if (!request.headers.accessToken) {
  //     // if refreshAuthLogic set accessToken for failedRequest here cant change that accessToken
  //     request.headers.accessToken = `${userLoginData?.accessToken}`;
  //   }
  // }
  // console.log("request1 :", request);

  const URL = request.url || "";

  if (/\[[a-zA-Z]+\]/.test(URL) && request.pathParams) {
    const pathParams = request.pathParams;
    const paramNamesArr = Array.from(
      URL.matchAll(/\[([a-zA-Z]+)\]/g),
      (m) => m[0]
    );
    const reformedUrl = paramNamesArr.reduce((res, paramName) => {
      const reducedParam = paramName.slice(1, -1);
      return res?.replace(paramName, pathParams[reducedParam]);
    }, request.url);
    return { ...request, url: reformedUrl };
  }
  // console.log(
  //   "Updated request headers in finaaaaaaaaaaaaaaaal :",
  //   request.headers
  // );
  return request;
};

const errorHandler = (error: AxiosErrorProps) => {
  const originalRequest = error.config;
  console.log("error in ssr", error);

  if (error.code === "ERR_NETWORK")
    if (
      error?.response?.status === 500 &&
      originalRequest.url === ApiRoutes.refresh_token
    ) {
      window.location.href = "/500";
    } else if (
      error?.response?.status === 502 ||
      error?.response?.status === 503
    ) {
      window.location.href = "/500";
    }
  return Promise.reject(error);
};

const successHandler = (response: AxiosResponse): AxiosResponse => {
  // console.log("success >>>>>>>>>>>>>>>>>>>>>>>>>" , response.config.headers["accessToken"] )
  return response;
};

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  const data = await getCookieAction("refreshToken");
  if (!data.isSuccess || !data?.data?.refreshToken) {
    return Promise.reject();
  }

  // return await fetch(`http://localhost:3000/api/refreshTokenSsr`, {
    return await fetch(`https://httponlycookieeee.netlify.app/api/refreshTokenSsr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: data.data.refreshToken,
    }),
    // body: JSON.stringify({}),
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then(async (data) => {
      console.log("data 500", data);
      if (!data?.data?.accessToken || !data?.data?.refreshToken) {
        return Promise.reject();
      }

      if (failedRequest?.config?.headers) {
        failedRequest.config.headers[
          "accessToken"
        ] = `${data.data.accessToken}`;
        // console.log(
        //   "failedRequest laaaaaaaaaaast :",
        //   failedRequest.config.url,
        //   data.data.accessToken
        // );
        return Promise.resolve();
      }
    })
    .catch((error) => {
      console.log("خطا در فرایند رفرش توکن:", error);
      if (error?.response?.status === 400) {
        console.log(error);
      }
    });
};

API.interceptors.request.use((request) => requestHandler(request));
API.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => successHandler(response),
  (error) => errorHandler(error)
);

createAuthRefreshInterceptor(API, refreshAuthLogic, {
  statusCodes: [401], // اطمینان از تنظیم کد خطای 401
  pauseInstanceWhileRefreshing: true,
});

export default API;
