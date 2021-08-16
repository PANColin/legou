import axios from "axios";
import { reject, resolve } from "q";
import qs from "qs";
import { Toast } from "vant";
// import router from "../router/index";
var instance = axios.create({
  baseURL: "http://shop.bufantec.com/bufan",
  timeout: 5000,
});
var toast;
// let timer = null;
instance.interceptors.request.use((config) => {
  // console.log(config);
  // const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  toast = Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  // console.log(user);

  if (config.method.toLocaleLowerCase() == "get") {
    // 参数统一
    config.params = config.data;
  } else {
    //post请求参数处理成表单的形式(将data的json格式数据转换成对象形式)
    config.data = qs.stringify(config.data);
  }
  // 在发送请求之前做些什么
  return config;
});

instance.interceptors.response.use(
  (response) => {
    toast.clear();
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
