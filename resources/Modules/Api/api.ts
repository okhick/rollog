import axios, { AxiosRequestConfig } from "axios";

const options: AxiosRequestConfig = {
  withCredentials: true,
};

export default axios.create(options);
