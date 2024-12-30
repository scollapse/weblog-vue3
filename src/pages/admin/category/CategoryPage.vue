<template>
    <div class="space-y-4">
        <search-bar @search="handleSearch" @reset="handleReset" />
        <category-list :categories="categories" @add-category="showAddCategoryDialog" />
        <pagination :total="total" :page-size="pageSize" :current-page="currentPage" :total-pages="totalPages"
            :on-prev="handlePrev" :on-next="handleNext" :on-page-click="handlePageClick" />
        <add-category :visible="isAddCategoryDialogVisible" @add-category="handleAddCategory"
            @cancel="hideAddCategoryDialog" />
    </div>
</template>

<script>
import { ref, computed } from "vue";
import SearchBar from "@/pages/admin/category/SearchBar.vue";
import CategoryList from "@/pages/admin/category/CategoryList.vue";
import Pagination from "@/components/Pagination.vue";
import AddCategory from "@/pages/admin/category/AddCategory.vue";
import { fetchCategories, addCategory } from "@/api/admin/category";
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
        const total = ref(0);
        const pageSize = ref(10);
        const currentPage = ref(1);
        const filters = ref({});
        const isAddCategoryDialogVisible = ref(false);

        const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

        function loadCategories(currentPage, pageSize, filters = {}) {
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

        const showAddCategoryDialog = () => {
            isAddCategoryDialogVisible.value = true;
        };

        const hideAddCategoryDialog = () => {
            isAddCategoryDialogVisible.value = false;
        };

        const handleAddCategory = (categoryName) => {
            // Logic to add a new category
            // 如果分类名称为空，则不添加，弹窗提示未输入分类名称
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
            isAddCategoryDialogVisible,
            handleSearch,
            handleReset,
            handlePrev,
            handleNext,
            handlePageClick,
            showAddCategoryDialog,
            hideAddCategoryDialog,
            handleAddCategory,
        };
    },
};
</script>