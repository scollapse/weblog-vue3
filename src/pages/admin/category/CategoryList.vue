<template>
    <div class="p-4 bg-white rounded-xl shadow-md">
        <div class="flex justify-between items-center mb-4">
            <button @click="$emit('add-category')" class="px-4 py-2 text-white bg-purple-600 rounded-xl hover:bg-purple-700">新增分类</button>
        </div>
        
        <!-- 加载效果 -->
        <div v-if="isLoading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>

        <table v-else class="min-w-full table-auto">
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
                        <button @click="$emit('delete-category',category.id)" class="px-2 py-1 text-white bg-gradient-to-r from-purple-500  to-pink-500 rounded hover:from-purple-700 hover:to-red-700">删除</button>
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
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>