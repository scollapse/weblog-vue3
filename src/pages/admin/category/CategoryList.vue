<template>
    <div class="p-4 bg-white rounded-xl shadow-md">
        <div class="flex justify-between items-center mb-4">
            <button @click="addCategory" class="px-4 py-2 text-white bg-purple-600 rounded-xl hover:bg-purple-700">新增分类</button>
        </div>
        <table class="min-w-full table-auto">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-4 py-2 text-left text-gray-600">分类名称</th>
                    <th class="px-4 py-2 text-left text-gray-600">创建时间</th>
                    <th class="px-4 py-2 text-left text-gray-600">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-100">
                    <td class="px-4 py-2">{{ category.name }}</td>
                    <td class="px-4 py-2">{{ category.createTime }}</td>
                    <td class="px-4 py-2">
                        <button @click="deleteCategory(category.id)" class="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700">删除</button>
                    </td>
                </tr>
                <tr v-if="categories.length === 0">
                    <td colspan="3" class="px-4 py-2 text-center text-gray-500">暂无数据</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
    methods: {
        addCategory() {
            // Logic to add a new category
            console.log('Add category button clicked');
        },
        deleteCategory(id) {
            // Logic to delete a category
            console.log('Delete category button clicked', id);
        },
    },
};
</script>