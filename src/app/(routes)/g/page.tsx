"use server";
// import { cookies } from "next/headers";
import Gcmp from "@/features/g/components/Gcmp";

const page = async () => {
  // const cookieStore = await cookies();
  // const ssrCookie = cookieStore.get("refreshToken");
  // const cookieValue = ssrCookie?.value
  //   ? JSON.parse(ssrCookie.value)
  //   : undefined;

  // console.log("refreshToken in ssr G", cookieValue?.refreshToken);

  return <Gcmp />;
};

export default page;
