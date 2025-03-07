import { ApiRoutes } from "@/config/apiRoutes";
// import { Config } from "@/config/config";
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import Cookies from "universal-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { userDataStore } from "@/store/useUserDataStore";
// import { getHttpOnlyCookie } from "./getHttpOnlyCookie";
// import { ApiResponse } from "@/interfaces/apiResponse";
// import { RefreshTokenData } from "@/interfaces/refreshTokenData";
import { getCookieAction } from "@/actions/cookieActions/getCookieAction";
// import { cookies } from "next/headers";

const API: AxiosInstance = Axios.create({
  // baseURL: Config.APIURL,
  baseURL: "https://kidzyshop.podland.ir/shop/api",
  timeout: 30000,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }), // indices: false  https://www.npmjs.com/package/qs
  },
});

const requestHandler = async (
  request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  console.log("interceptor req :", request.headers.accessToken);

  if (!!!request.headers["Accept"]) {
    request.headers["Accept"] = "application/json";
  }

  if (!!!request.headers["Content-Type"]) {
    request.headers["Content-Type"] = "application/json";
  }

  // ------------------------------------------------------------- csr :  add accessToken in req header with universal
  const cookie = new Cookies(String(request.headers.cookie));
  const user = cookie.get("userData");
  console.log(
    "accessToken universal-cookie:",
    user?.userLoginData?.accessToken
  );
  console.log("@@@@@@@@@@@@@ in csr", userDataStore().userLoginData);

  // error : That only works in a Server Component
  // const cookieStore = await cookies();
  // const userDataCookie = cookieStore.get("userData");
  // const userCookie = userDataCookie ? JSON.parse(userDataCookie.value) : null;
  // console.log("userCookie incsr :", userCookie);

  if (
    user &&
    user?.userLoginData?.accessToken &&
    !request.headers.accessToken
  ) {
    console.log("request has not access so set accessToken for this request");
    request.headers.accessToken = `${user?.userLoginData?.accessToken}`;
  }

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
  console.log(
    "Updated request headers in finaaaaaaaaaaaaaaaal :",
    request.headers
  );
  return request;
};

interface AxiosErrorProps extends AxiosError {
  config: AxiosError["config"] & {
    _retry: boolean;
  };
}

const errorHandler = (error: AxiosErrorProps) => {
  const originalRequest = error.config;
  // console.log("error get in errorHandler:", error);

  if (error.code === "ERR_NETWORK")
    console.log(
      "vpn خود را قطع و از برقراری ارتباط اینترنت خود اطمینان حاصل نمایید."
    );
  // ErrorToast({
  //   msg: "vpn خود را قطع و از برقراری ارتباط اینترنت خود اطمینان حاصل نمایید.",
  // });
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
  // return Promise.reject(error?.response?.data); // اگر چیزی غیر از ارور کلی را ریترن کنید پکیج نصب کردی برای هندل کردن 401 نمیتواند تشخیص دهد 401 شده
  return Promise.reject(error);
};

const successHandler = (response: AxiosResponse): AxiosResponse => {
  return response;
};

API.interceptors.request.use((request) => requestHandler(request));
API.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => successHandler(response),
  (error) => errorHandler(error)
);

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  // const cookie = new Cookies(failedRequest?.config?.headers?.cookie || "");
  // const user = cookie.get("userData");

  // if (!user || !user?.userLoginData?.refreshToken) {
  //   return Promise.reject();
  // }

  // const data: ApiResponse<RefreshTokenData> = await getHttpOnlyCookie({
  //   cookieName: "refreshToken",
  // });

  const data = await getCookieAction("refreshToken");

  if (!data.isSuccess || !data?.data?.refreshToken) {
    return Promise.reject();
  }
  console.log("refreshToken in refreshAuthLogic :", data);

  const formData = {
    refreshToken: data.data.refreshToken,
  };

  return await Axios.post(
    // `${Config.APIURL}${ApiRoutes.refresh_token}`,
    `https://kidzyshop.podland.ir/shop/api${ApiRoutes.refresh_token}`,
    {},
    { headers: formData }
  )
    .then(({ status, data }) => {
      if (status === 200) {
        if (
          data?.singleResult?.accessToken &&
          data?.singleResult?.refreshToken
        ) {
          console.log("refreshed data  :", data);

          const { changeData } = userDataStore();

          changeData({
            accessToken: data.singleResult.accessToken,
            refreshToken: data.singleResult.refreshToken,
          });

          if (failedRequest?.config?.headers && data.singleResult.accessToken) {
            failedRequest.config.headers[
              "accessToken"
            ] = `${data.singleResult.accessToken}`;
            console.log("failedRequest laaaaaaaaaaast :", failedRequest);
            return Promise.resolve();
          }
        }
      }
    })
    .catch((error: AxiosError) => {
      if (error?.response?.status === 400) {
        console.log("error in interceptor :", error);
        const { clearData } = userDataStore();
        clearData("userData");
        window.location.href = "/";
      }
    });
};

createAuthRefreshInterceptor(API, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

export default API;
