<template>
    <div class="space-y-4">
        <search-bar @search="handleSearch" @reset="handleReset" />
        <category-list :categories="categories" />
        <pagination :total="total" :page-size="pageSize" :current-page="currentPage" :total-pages="totalPages"
            :on-prev="handlePrev" :on-next="handleNext" :on-page-click="handlePageClick" />
    </div>
</template>

<script>
import { ref, computed } from "vue";
import SearchBar from "@/pages/admin/category/SearchBar.vue";
import CategoryList from "@/pages/admin/category/CategoryList.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchCategories } from "@/api/admin/category";

export default {
    components: {
        SearchBar,
        CategoryList,
        Pagination,
    },
    setup() {
        const categories = ref([]);
        const total = ref(0);
        const pageSize = ref(10);
        const currentPage = ref(1);
        const filters = ref({});

        const totalPages = computed(() => Math.ceil(total.value / pageSize.value));


        // 获取分页数据
        function loadCategories(currentPage, pageSize, filters = {}) {
            // 调用后台分页接口，并传入所需参数
            fetchCategories({ current: currentPage, size: pageSize, startDate: filters.startDate || "", endDate: filters.endDate || "", name: filters.name || "" }).then((res) => {
                console.log(res);
                if (res.success) {
                    categories.value = res.total > 0 ? res.data : [];
                    total.value = res.total;
                }
            });
        }


        const handleSearch = (newFilters) => {
            filters.value = newFilters;
            currentPage.value = 1;
            loadCategories(currentPage.value, pageSize.value, filters.value);
        };

        const handleReset = () => {
            filters.value = {};
            currentPage.value = 1;
            loadCategories(currentPage.value, pageSize.value);
        };

        const handlePrev = () => {
            if (currentPage.value > 1) {
                currentPage.value -= 1;
                loadCategories(currentPage.value, pageSize.value, filters.value);
            }
        };

        const handleNext = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value += 1;
                loadCategories(currentPage.value, pageSize.value, filters.value);
            }
        };

        const handlePageClick = (page) => {
            currentPage.value = page;
            loadCategories(page, pageSize.value, filters.value);
        };

        loadCategories(currentPage.value, pageSize.value);

        return {
            categories,
            total,
            pageSize,
            currentPage,
            totalPages,
            handleSearch,
            handleReset,
            handlePrev,
            handleNext,
            handlePageClick,
        };
    },
};
</script>