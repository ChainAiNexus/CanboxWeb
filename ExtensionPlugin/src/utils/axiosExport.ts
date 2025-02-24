import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> {
    success: boolean;
    code: number;
    message: string;
    msg: string;
    data: T;
  }
}

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60 * 1000,
  headers: {
    // "Content-Type": "application/json;charset=UTF-8",
  },
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //   config = handleRequestHeader(config)
  return config;
});

request.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      if (response.data.code !== 0) {
        // 
        return response;
      }
      return response.data;
    }

    return response;
  },
  (err: { response: { status: any } }) => {
    if (err.response) {
      //   handleNetworkError(err.response.status)
    }
    Promise.reject(err.response);
  }
);

export default request;
