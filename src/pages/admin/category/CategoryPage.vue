<template>
    <div class="space-y-4">
        <search-bar :fields="searchFields" :filters="filters" @search="handleSearch" @reset="handleReset" />
        <category-list :categories="categories" @add-category="showAddCategoryDialog" />
        <pagination :total="total" :page-size="pageSize" :current-page="currentPage" :total-pages="totalPages"
            :load-categories="loadCategories" :filters="filters" :set-current-page="setCurrentPage" />
        <add-category :visible="isAddCategoryDialogVisible" @add-category="handleAddCategory"
            @cancel="hideAddCategoryDialog" />
    </div>
</template>

<script>
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import CategoryList from "@/pages/admin/category/CategoryList.vue";
import Pagination from "@/components/Pagination.vue";
import AddCategory from "@/pages/admin/category/AddCategory.vue";
import { fetchCategories, addCategory } from "@/api/admin/category";
import usePagination from "@/composables/usePagination";
import toast from "@/composables/utils/toast";

export default {
    components: {
        SearchBar,
        CategoryList,
        Pagination,
        AddCategory,
    },
    setup() {
        const categories = ref([]);
        const filters = ref({});
        const isAddCategoryDialogVisible = ref(false);

        const {
            total,
            pageSize,
            currentPage,
            totalPages,
            setTotal,
            setCurrentPage,
        } = usePagination();

        // 定义搜索 Bar
        const searchFields = ref([
            { type: 'input', values: [{'key':'name','value':'名称'}] },
            { type: 'daterangePicker', values: [{'key':'','value':''}] }
        ]);

        function loadCategories(currentPage, pageSize, filters = {}) {
            fetchCategories({ current: currentPage, size: pageSize, startDate: filters.startDate || "", endDate: filters.endDate || "", name: filters.name || ""}).then((res) => {
                console.log(res);
                if (res.success) {
                    categories.value = res.total > 0 ? res.data : [];
                    setTotal(res.total);
                }
            });
        }

        const handleSearch = (newFilters) => {
            filters.value = newFilters;
            loadCategories(1, pageSize.value, filters.value);
        };

        const handleReset = () => {
            filters.value = {};
            loadCategories(1, pageSize.value);
        };

        const showAddCategoryDialog = () => {
            isAddCategoryDialogVisible.value = true;
        };

        const hideAddCategoryDialog = () => {
            isAddCategoryDialogVisible.value = false;
        };

        const handleAddCategory = (categoryName) => {
            if (!categoryName) {
                toast.show('error', '请输入分类名称');
                return;
            }
            addCategory({name:categoryName}).then((res) => {
                if (res.success) {
                    toast.show('success', '新增分类成功');
                    hideAddCategoryDialog();
                    loadCategories(currentPage.value, pageSize.value, filters.value);
                }
            });
        };

        loadCategories(currentPage.value, pageSize.value);

        return {
            categories,
            total,
            pageSize,
            currentPage,
            totalPages,
            filters,
            searchFields,
            isAddCategoryDialogVisible,
            handleSearch,
            handleReset,
            showAddCategoryDialog,
            hideAddCategoryDialog,
            handleAddCategory,
            loadCategories,
            setCurrentPage,
        };
    },
};
</script>