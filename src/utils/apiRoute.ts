import axios from "axios";
import { redirect } from "next/navigation";

const apiRoute = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_ROUTE_URL || "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

apiRoute.interceptors.response.use(
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

export default apiRoute;
