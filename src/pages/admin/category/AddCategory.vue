<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">新增分类</h2>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">分类名称</label>
                <input v-model="categoryName" type="text" class="w-full px-3 py-2 border-2 border-purple-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-purple-400" />
            </div>
            <div class="flex justify-end space-x-4">
                <button @click="handleCancel" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">取消</button>
                <button @click="handleAdd" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">新增</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            categoryName: '',
        };
    },
    methods: {
        handleAdd() {
            this.$emit('add-category', this.categoryName);
            this.categoryName = '';
        },
        handleCancel() {
            this.$emit('cancel');
            this.categoryName = '';
        },
    },
};
</script>
