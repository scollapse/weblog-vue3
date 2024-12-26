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
        <div class="relative flex items-center" ref="dropdown">
            <button class="text-white focus:outline-none hover:text-cyan-500 mr-4" @click="toggle">
                <svg v-if="!isFullscreen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zm6 10v6h-6v-2h4v-4h2zm-10 6H4v-6h2v4h4v2z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18h-6v-2h4v-4h2v6zm-10 0H4v-6h2v4h4v2zm10-10V4h-6v2h4v4h2zm-10 0H4V4h6v2H6v4H4z" />
                </svg>
            </button>
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
                        <a href="#" class="block px-4 py-2 rounded-lg hover:bg-cyan-100">个人信息</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 rounded-lg hover:bg-cyan-100">系统设置</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 rounded-lg hover:bg-cyan-100">账号登出</a>
                    </li>
                </ul>
            </transition>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useFullscreen } from '@vueuse/core';

// isFullscreen 表示当前是否处于全屏；toggle 用于动态切换全屏、非全屏
const { isFullscreen, toggle } = useFullscreen()

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

// 处理点击页面空白处关闭下拉菜单
const handleClickOutside = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        isDropdownOpen.value = false;
    }
};

const dropdown = ref(null);

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
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