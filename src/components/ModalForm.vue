<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div :class="['bg-white rounded-xl shadow-lg p-6', dialogWidth]">
            <!-- 标题 -->
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-semibold text-gray-900">
                    {{ title }}
                </h3>
                <button @click="closeModal" class="text-gray-400 hover:bg-gray-200 rounded-xl text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <!-- 表单插槽 -->
            <slot></slot>
            <!-- 操作按钮 -->
            <div class="mt-10 flex justify-end space-x-2">
                <button @click="submit" class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-xl text-sm px-5 py-2.5">
                    {{ confirmButtonText }}
                </button>
                <button @click="closeModal" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl border border-gray-300 text-sm px-5 py-2.5">
                    取消
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        dialogWidth: {
            type: String,
            default: 'max-w-md'
        },
        confirmButtonText: {
            type: String,
            default: '确定'
        }
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        openModal() {
            this.visible = true;
        },
        closeModal() {
            this.visible = false;
        },
        submit() {
            this.$emit('submit');
        }
    }
};
</script>

<style scoped>
/* 可添加自定义样式 */
</style>
