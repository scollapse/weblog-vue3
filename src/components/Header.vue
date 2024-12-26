<template>
    <header class="bg-cyan-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <!-- 左侧折叠按钮 -->
        <button class="text-white focus:outline-none hover:text-cyan-500" @click="toggleSidebar">
            <svg v-if="!isSidebarCollapsed" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 12L6 6v12z" />
            </svg>
        </button>

        <!-- 中间标题 -->
        <h1 class="text-xl font-bold tracking-wide">
            Header Title
        </h1>

        <!-- 右侧用户菜单 -->
        <div class="relative flex items-center">
            <button class="focus:outline-none flex items-center space-x-2 hover:bg-cyan-800 px-3 py-1 rounded-lg"
                @click="toggleDropdown">
                <img class="w-8 h-8 rounded-full border-2 border-cyan-500" src="https://via.placeholder.com/150"
                    alt="User Avatar" />
                <span class="hidden md:inline">{{ userName }}</span>
            </button>
            <!-- 用户菜单下拉框 -->
            <transition name="fade">
                <ul v-if="isDropdownOpen"
                    class="absolute right-0 mt-44 w-48 bg-cyan-50 text-gray-800 rounded-lg shadow-lg z-10">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-cyan-100">个人信息</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-cyan-100">系统设置</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-cyan-100">账号登出</a>
                    </li>
                </ul>
            </transition>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();

// 侧边栏折叠状态
import { computed } from 'vue';

const isSidebarCollapsed = computed(() => menuStore.isSidebarCollapsed);

// 切换侧边栏折叠状态
const toggleSidebar = () => {
    menuStore.toggleSidebar();
};

// 下拉菜单状态
const isDropdownOpen = ref(false);

// 用户名
const userName = 'John Doe';

// 切换下拉菜单状态
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
/* 添加必要的样式以优化布局 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>