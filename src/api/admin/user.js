import axios from "@/axios";

// 登录接口
export function login(email, password) {
    return axios.post("/login", { email, password });
}