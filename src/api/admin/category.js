import axios from "@/axios";

export function fetchCategories(data) {
    return axios.post("/interface/admin/category/list", 
        data
    );
}
