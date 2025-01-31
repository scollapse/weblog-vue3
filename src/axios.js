import axios from "axios";
import { getToken } from "@/composables/utils/cookie";
import toast from "@/composables/utils/toast";

// Create an axios instance
const instance = axios.create({
    baseURL: "/api",
    timeout: 7000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    console.log('统一添加请求头的 token', token)
    
    // 如果 token 存在，就添加到请求头中
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let message = error.response.data.message || '请求失败'
    toast.show('error', message)
    return Promise.reject(error)
})


// 暴露出去
export default instance;