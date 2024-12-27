import axios from "@/axios";

// 登录接口
export function login(email, password) {
    return axios.post("/login", { email, password });
}

// 获取用户信息
export function getUserInfo() {
    return axios.post("/admin/user/info/findCurrent");
}