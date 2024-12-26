<template>
  <div class="pl-2 border-b border-gray-200 bg-purple-100 shadow flex justify-between items-center">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
      <li
        v-for="tab in tabStore.tabs"
        :key="tab.path"
        class="mr-2 flex items-center"
      >
        <div
          :class="[
            'inline-block p-4 rounded-3xl border-2 transition flex items-center',
            tabStore.activeTab === tab.path
              ? 'text-purple-600 border-purple-600'
              : 'text-gray-500 border-transparent hover:text-purple-400 hover:border-purple-400'
          ]"
        >
          <button @click="changeTab(tab.path)">
            {{ tab.title }}
          </button>
          <button
            v-if="tab.path !== '/admin/index'"
            class="ml-2 text-gray-500 hover:text-purple-200"
            @click="closeTab(tab.path)"
          >
            &times;
          </button>
        </div>
      </li>
    </ul>
    <div class="relative" style="right: 20px;" ref="dropdown">
      <button @click="toggleDropdown" class="text-gray-500 hover:text-purple-400">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <transition name="fade">
        <ul v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
          <li>
            <a @click="closeOtherTabs" class="block px-4 py-2 rounded-lg hover:bg-purple-100 cursor-pointer">关闭其他</a>
          </li>
          <li>
            <a @click="closeAllTabs" class="block px-4 py-2 rounded-lg hover:bg-purple-100 cursor-pointer">关闭全部</a>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTabStore } from '@/stores/tab';
import { useRoute, useRouter } from 'vue-router';
import { useClickOutside } from '@/composables/utils/useClickOutside';

// 引入 Tab Store
const tabStore = useTabStore();
tabStore.loadTabs(); // 加载保存的 tabs 状态
const route = useRoute();
const router = useRouter();

// 引入 Menu Store
import { useMenuStore } from '@/stores/menu';
const menuStore = useMenuStore();

// 使用 useClickOutside 组合式函数
const { isDropdownOpen, dropdown, toggleDropdown } = useClickOutside();

// 切换 Tab
const changeTab = (path) => {
  tabStore.setActiveTab(path); // 更新 Store 中的激活状态
  menuStore.setActiveMenu(path); // 更新菜单的选中状态
  router.push(path); // 切换路由
};

// 关闭 Tab
const closeTab = (path) => {
  const tabIndex = tabStore.tabs.findIndex(tab => tab.path === path);
  tabStore.removeTab(path); // 从 Store 中移除 Tab

  if (tabStore.activeTab === path) {
    if (tabStore.tabs.length > 0) {
      const newActiveTab = tabStore.tabs[tabIndex] || tabStore.tabs[tabIndex - 1];
      changeTab(newActiveTab.path); // 切换到下一个或上一个 Tab
    } else {
      changeTab('/admin/index'); // 如果没有 Tab 了，跳转到默认路径
    }
  }
};

// 关闭其他 Tab
const closeOtherTabs = () => {
  tabStore.tabs = tabStore.tabs.filter(tab => tab.path === '/admin/index' || tab.path === tabStore.activeTab);
  tabStore.saveTabs();
  isDropdownOpen.value = false;
};

// 关闭全部 Tab
const closeAllTabs = () => {
  tabStore.tabs = tabStore.tabs.filter(tab => tab.path === '/admin/index');
  changeTab('/admin/index');
  isDropdownOpen.value = false;
};

// 监听路由变化，动态设置激活的 Tab 和菜单
watch(
  () => route.path,
  (newPath) => {
    tabStore.setActiveTab(newPath);
    menuStore.setActiveMenu(newPath);
  },
  { immediate: true }
);
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