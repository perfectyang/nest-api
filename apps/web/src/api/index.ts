/* eslint-disable prettier/prettier */
import {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import { merge } from "lodash";

import { baseURL, Http } from "./base";

// 自动引入urls目录下的文件
const Api: Record<string, any> = {};
const globs: Recordable<any> = import.meta.glob("./modules/**/*.ts", {
  eager: true,
});
Object.keys(globs).forEach((i) => {
  const path = i.substring(2, i.length - 3);
  const paths = path.split("/");
  Api[paths[1]] = globs[i].default;
});

const ApiConfig = async (apiUrl: string) => {
  return {
    url: `${baseURL}${apiUrl}`,
  };
};
Http.interceptors.request.use(
  async (config: any) => {
    const _header = { ...config.headers };
    config.headers = {
      ..._header,
      "Content-Type": "application/json;charset=UTF-8",
      "Accept-Language": "zh",
    };

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config?.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  },
);
Http.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    const redata = response.data || {};
    if (redata) {
      if (redata.code === 200) {
        return Promise.resolve(redata);
      } else if ([401, 403].includes(redata.code)) {
        return Promise.resolve({});
      } else {
        redata.traceId = response.headers?.["trace-id"];
        return Promise.resolve(redata);
      }
    } else {
      // 默认返回数据是对象
      const isNumber =
        Object.prototype.toString.call(redata.data) === "[object Number]";
      return Promise.resolve(isNumber ? redata.data : redata.data || redata);
    }
  },
  async (error: AxiosError) => {
    const { response }: any = error;

    if (error.message.indexOf("timeout") !== -1)
      return Promise.reject(new Error("请求超时"));
    if (response?.data?.code === 401) {
      return;
    }

    if (response?.data?.code === 1000000004) {
      location.reload();

      return;
    }
    // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
    if (!window.navigator.onLine) window.location.hash = "/error/500";
    return Promise.reject(error);
  },
);

const OriginAjax = {
  get<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    const defConfig: any = {};
    if (params && Object.keys(params).length > 0) {
      merge(defConfig, { params });
    }
    if (config) merge(defConfig, config);
    return Http.get(url, defConfig);
  },
  delete<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    const defConfig: any = {};
    if (params && Object.keys(params).length > 0) {
      merge(defConfig, { params });
    }
    if (config) merge(defConfig, config);
    return Http.delete(url, defConfig);
  },
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    return Http.post(url, data, config);
  },
  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    return Http.put(url, data, config);
  },
  patch<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    return Http.patch(url, data, config);
  },
};

const Ajax: typeof OriginAjax = {} as typeof OriginAjax;

Object.keys(OriginAjax).forEach((key) => {
  Ajax[key] = OriginAjax[key];
});

export { Http, Ajax, Api, ApiConfig };
