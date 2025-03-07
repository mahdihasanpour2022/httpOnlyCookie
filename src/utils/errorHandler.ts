import { AxiosError } from "axios";

export const errorHandler = (error: AxiosError) => {
  // حالا error از نوع AxiosError است نه AxiosResponse
  if (error.response) {
    // اگر پاسخ موجود است
    console.error("Response error:", error.response);
    if (error.response.status === 500) {
      console.log("Server error");
    } else if (error.response.status === 502 || error.response.status === 503) {
      console.log("Server unavailable");
      window.location.href = "/500";
    }
  } else if (error.request) {
    // اگر هیچ پاسخی دریافت نکردیم
    console.log("No response received:", error.request);
  } else {
    // اگر مشکل در تنظیم درخواست باشد
    console.error("Error in request setup:", error.message);
  }

  return Promise.reject(error);
};