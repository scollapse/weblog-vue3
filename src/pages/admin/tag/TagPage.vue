<template>
    <div class="space-y-4">
        <search-bar :fields="searchFields" :filters="filters" :refresh="refreshData" />
        <tag-list :tags="tags" :isLoading="isLoading" @add-tag="showAddTagDialog"
            @delete-tag="onDeleteTag" />
        <pagination :load-data="loadTags" :filters="filters" ref="pagination" />
        <ModalForm ref="addTagModal"      
            :isLoading="isConfirmLoading"
            :title="'新增标签'" 
            :dialogWidth="'w-96'" 
            :confirmButtonText="'新增'"
            @submit="handleAddTag" 
            @close="clearForm">
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">标签名称</label>
                <input v-model="form.tagName" type="text"
                    class="w-full px-3 py-2 border-2 border-purple-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-purple-400" />
            </div>
        </ModalForm>
    </div>
</template>

<script>
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import TagList from "@/pages/admin/tag/TagList.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchTags, addTag, deleteTag } from "@/api/admin/tag";
import toast from "@/composables/utils/toast";
import modal from '@/composables/utils/modal';
import ModalForm from '@/components/ModalForm.vue';

export default {
    components: {
        SearchBar,
        TagList,
        Pagination,
        ModalForm
    },
    setup() {
        const tags = ref([]);
        const filters = ref({});
        const pagination = ref(null); // 分页组件实例
        const addTagModal = ref(null); // ModalForm 组件实例
        const form = ref({ tagName: '' });
        const isLoading = ref(false);
        const isConfirmLoading = ref(false);

        // 定义搜索 Bar
        const searchFields = ref([
            { type: 'input', values: [{ key: 'name', value: '标签名称' }] },
            { type: 'daterangePicker', values: [{ key: '', value: '' }] },
        ]);

        // 加载标签数据
        const loadTags = async (currentPage, pageSize, filters, setTotal) => {
            isLoading.value = true;
            try {
                const res = await fetchTags({
                    current: currentPage,
                    size: pageSize,
                    startDate: filters.startDate || "",
                    endDate: filters.endDate || "",
                    name: filters.name || "",
                });
                if (res.success) {
                    tags.value = res.total > 0 ? res.data : [];
                    setTotal(res.total); // 更新总数据量
                }
            } catch (error) {
                console.error('Failed to fetch tags:', error);
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
        loadTags(1, 10, filters.value, (total) => {
            if (pagination.value) {
                pagination.value.setTotal(total); // 调用 setTotal 方法
            }
        });

        // 显示新增标签对话框
        const showAddTagDialog = () => {
            addTagModal.value.openModal();
        };

        // 隐藏新增标签对话框
        const hideAddTagDialog = () => {
            addTagModal.value.closeModal();
        };

        // 模态框关闭后的事件  清空表单
        const clearForm = () => {
            form.value.tagName = '';
        };
        // 处理新增标签
        const handleAddTag = async () => {
            console.log('Add tag button clicked', form.value.tagName);
            if (!form.value.tagName) {
            toast.show('error', '请输入标签名称');
            return;
            }

            // 开始加载动画
            isConfirmLoading.value = true;

            try {
            const res = await addTag({ tagNames: [form.value.tagName] });
            if (res.success) {
                toast.show('success', '新增标签成功');
                hideAddTagDialog();
                refreshData(filters.value); // 刷新数据
            } else {
                toast.show('error', res.errorMessage);
            }
            } catch (error) {
            console.error('新增标签失败:', error);
            toast.show('error', '新增标签失败，请重试');
            } finally {
            // 结束加载动画
            isConfirmLoading.value = false;
            }
        };

        // 删除标签
        const onDeleteTag = async (id) => {
            console.log('Delete tag button clicked', id);
            modal.showConfirm('确定要删除吗？', () => {
                deleteTag({ id: id }).then((res) => {
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
            tags,
            filters,
            searchFields,
            loadTags,
            showAddTagDialog,
            hideAddTagDialog,
            handleAddTag,
            pagination,
            refreshData,
            onDeleteTag, // 确保定义 onDeleteTag 方法
            addTagModal,
            form,
            isLoading,
            clearForm,
            isConfirmLoading
        };
    },
};
</script>