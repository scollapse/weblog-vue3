<template>
    <div class="space-y-4">
      <search-bar :fields="searchFields" :filters="filters" :refresh="refreshData" />
      <category-list :categories="categories" @add-category="showAddCategoryDialog" />
      <pagination :load-data="loadCategories" :filters="filters" ref="pagination" />
      <add-category :visible="isAddCategoryDialogVisible" @add-category="handleAddCategory" @cancel="hideAddCategoryDialog" />
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import SearchBar from "@/components/SearchBar.vue";
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
      const filters = ref({});
      const isAddCategoryDialogVisible = ref(false);
      const pagination = ref(null); // 分页组件实例
  
      // 定义搜索 Bar
      const searchFields = ref([
        { type: 'input', values: [{ key: 'name', value: '名称' }] },
        { type: 'daterangePicker', values: [{ key: '', value: '' }] },
      ]);
  
      // 加载分类数据
      const loadCategories = async (currentPage, pageSize, filters, setTotal) => {
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
        isAddCategoryDialogVisible.value = true;
      };
  
      // 隐藏新增分类对话框
      const hideAddCategoryDialog = () => {
        isAddCategoryDialogVisible.value = false;
      };
  
      // 处理新增分类
      const handleAddCategory = async (categoryName) => {
        if (!categoryName) {
          toast.show('error', '请输入分类名称');
          return;
        }
        const res = await addCategory({ name: categoryName });
        if (res.success) {
          toast.show('success', '新增分类成功');
          hideAddCategoryDialog();
          refreshData(filters.value); // 刷新数据
        }
      };
  
      return {
        categories,
        filters,
        searchFields,
        isAddCategoryDialogVisible,
        loadCategories,
        showAddCategoryDialog,
        hideAddCategoryDialog,
        handleAddCategory,
        pagination,
        refreshData,
      };
    },
  };
  </script>