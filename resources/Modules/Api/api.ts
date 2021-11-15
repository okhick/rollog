import axios, { AxiosRequestConfig } from "axios";
import router from "@/scripts/router";

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
*/

const options: AxiosRequestConfig = {
  withCredentials: true,
};

/*
|--------------------------------------------------------------------------
| Create Instance
|--------------------------------------------------------------------------
*/

const axiosInstance = axios.create(options);

/*
|--------------------------------------------------------------------------
| Interceptors
|--------------------------------------------------------------------------
*/

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Import this here to ensure Pinia has been booted.
    const { useAuthStore } = await import("../Auth/store");
    const authStore = useAuthStore();

    /* 
    |--------------------------------
    | Handle specific codes
    |--------------------------------
    */
    switch (error.response.status) {
      case 401:
        console.error("UNAUTHORIZED");
        authStore.$reset();
        router.push({ name: "login" });
        break;

      // handle other codes
    }

    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

export default axiosInstance;
