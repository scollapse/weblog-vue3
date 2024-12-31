<template>
    <div class="space-y-4">
        <search-bar :fields="searchFields" :filters="filters" :refresh="refreshData" />
        <category-list :categories="categories" :isLoading="isLoading" @add-category="showAddCategoryDialog"
            @delete-category="onDeleteCategory" />
        <pagination :load-data="loadCategories" :filters="filters" ref="pagination" />
        <ModalForm ref="addCategoryModal"      
            :isLoading="isConfirmLoading"
            :title="'新增分类'" 
            :dialogWidth="'w-96'" 
            :confirmButtonText="'新增'"
            @submit="handleAddCategory" 
            @close="clearForm">
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">分类名称</label>
                <input v-model="form.categoryName" type="text"
                    class="w-full px-3 py-2 border-2 border-purple-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-purple-400" />
            </div>
        </ModalForm>
    </div>
</template>

<script>
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import CategoryList from "@/pages/admin/category/CategoryList.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchCategories, addCategory, deleteCategory } from "@/api/admin/category";
import toast from "@/composables/utils/toast";
import modal from '@/composables/utils/modal';
import ModalForm from '@/components/ModalForm.vue';

export default {
    components: {
        SearchBar,
        CategoryList,
        Pagination,
        ModalForm
    },
    setup() {
        const categories = ref([]);
        const filters = ref({});
        const pagination = ref(null); // 分页组件实例
        const addCategoryModal = ref(null); // ModalForm 组件实例
        const form = ref({ categoryName: '' });
        const isLoading = ref(false);
        const isConfirmLoading = ref(false);

        // 定义搜索 Bar
        const searchFields = ref([
            { type: 'input', values: [{ key: 'name', value: '名称' }] },
            { type: 'daterangePicker', values: [{ key: '', value: '' }] },
        ]);

        // 加载分类数据
        const loadCategories = async (currentPage, pageSize, filters, setTotal) => {
            isLoading.value = true;
            try {
                const res = await fetchCategories({
                    current: currentPage,
                    size: pageSize,
                    startDate: filters.startDate || "",
                    endDate: filters.endDate || "",
                    name: filters.name || "",
                });
                if (res.success) {
                    categories.value = res.total > 0 ? res.data : [];
                    setTotal(res.total); // 更新总数据量
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                isLoading.value = false;
            }
        };

        // 刷新数据
        const refreshData = (newFilters) => {
            if (pagination.value) {
                pagination.value.refresh(newFilters);
            }
        };

        // 初始化加载数据
        loadCategories(1, 10, filters.value, (total) => {
            if (pagination.value) {
                pagination.value.setTotal(total); // 调用 setTotal 方法
            }
        });

        // 显示新增分类对话框
        const showAddCategoryDialog = () => {
            addCategoryModal.value.openModal();
        };

        // 隐藏新增分类对话框
        const hideAddCategoryDialog = () => {
            addCategoryModal.value.closeModal();
        };

        // 模态框关闭后的事件  清空表单
        const clearForm = () => {
            form.value.categoryName = '';
        };

        // 处理新增分类
        const handleAddCategory = async () => {
            console.log('Add category button clicked', form.value.categoryName);
            if (!form.value.categoryName) {
                toast.show('error', '请输入分类名称');
                return;
            }

            // 开始加载动画
            isConfirmLoading.value = true;

            try {
                // 模拟延迟
                const res = await addCategory({ name: form.value.categoryName });
                if (res.success) {
                    toast.show('success', '新增分类成功');
                    hideAddCategoryDialog();
                    refreshData(filters.value); // 刷新数据
                } else {
                    toast.show('error', res.errorMessage);
                }
            } catch (error) {
                console.error('新增分类失败:', error);
                toast.show('error', '新增分类失败，请重试');
            } finally {
                // 结束加载动画
                isConfirmLoading.value = false;
            }
        };

        // 删除分类
        const onDeleteCategory = async (id) => {
            console.log('Delete category button clicked', id);
            modal.showConfirm('确定要删除吗？', () => {
                deleteCategory({ id: id }).then((res) => {
                    if (!res.success) {
                        toast.show('error', '删除失败!');
                        return;
                    }
                    toast.show('success', '删除成功!');
                    refreshData(filters.value); // 刷新数据
                });
            });
        };

        return {
            categories,
            filters,
            searchFields,
            loadCategories,
            showAddCategoryDialog,
            hideAddCategoryDialog,
            handleAddCategory,
            pagination,
            refreshData,
            onDeleteCategory, // 确保定义 onDeleteCategory 方法
            addCategoryModal,
            form,
            isLoading,
            clearForm,
            isConfirmLoading
        };
    },
};
</script>