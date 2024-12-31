import axios from "@/axios";

export function fetchCategories(data) {
    return axios.post("/interface/admin/category/list", 
        data
    );
}

export function addCategory(data) {
    return axios.post("/interface/admin/category/add", 
        data
    );
}

export function deleteCategory(data) {
    return axios.post("/interface/admin/category/delete", 
        data
    );
}

export function fetchCategoryList(data) {
    return axios.post("/interface/admin/category/select/list", 
        data
    );
}