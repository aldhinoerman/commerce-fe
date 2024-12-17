import axios from "axios";
import { redirect } from "next/navigation";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          redirect("/admin");

        case 403:
          alert("You do not have permission to perform this action.");
          break;

        case 500:
          redirect(
            `/exception?message=${encodeURIComponent("Internal Server Error")}`
          );

        default:
          console.error("An error occurred:", error.response.data);
          break;
      }
    } else {
      console.error("An error occurred:", error.message);
    }

    return Promise.reject(error);
  }
);

export default request;
