import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "./auth";
import { errorMessage } from "@/constants/http";
import logger from "./logger";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const skipToken = (config.headers || {}).skipToken === true;
    if (getToken() && !skipToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    if (config.method === "get") {
      config.params = {
        ...(config.params || {}),
        _t: Date.now(), // 防止 GET 请求缓存
      };
    }

    // 你可以在这里做签名/加密等操作
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


// 响应拦截器
service.interceptors.response.use(
  (res) => {
    logger.info(`请求路径：${res.config.url}`);
    // 二进制数据则直接返回
    const contentType = res.headers["content-type"];
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer" ||
      contentType?.includes("application/octet-stream")
    ) {
      return res.data;
    }
    const { code, message, data, success } = res.data;

    if (code === 401) {
      // TODO token 过期，调刷新token
      return Promise.reject(res.data);
    }

    if (code !== 200 || success === false) {
      // 获取错误信息
      const msg =
        message ||
        errorMessage[code as keyof typeof errorMessage] ||
        errorMessage["default"];

      ElMessage({ message: msg, type: "error", duration: 5 * 1000 });
      return Promise.reject(res.data);
    }

    return Promise.resolve(data);
  },
  (error) => {
    logger.error(error);
    let { message = "未知错误", status } = error;
    if (status === 401) {
      // TODO token 过期，调刷新token
      return Promise.reject(error.response?.data || error);
    }
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message?.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message?.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({ message: message, type: "error", duration: 5 * 1000 });
    return Promise.reject(error.response?.data || error);
  }
);

export default service;
