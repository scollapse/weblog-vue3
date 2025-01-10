import axios from "@/axios";

export function updateSetting(data) {
    return axios.post("/interface/admin/blog/settings/update", 
        data
    );
}

// 获取详情
export function fetchSetting(data) {
    return axios.post("/interface/admin/blog/settings/detail", 
        data
    );
}