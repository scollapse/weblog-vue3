<template>
  <div class="pl-2 border-b border-gray-200 bg-purple-100 shadow">
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
  </div>
</template>

<script setup>
import { useTabStore } from '@/stores/tab';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';

// 引入 Tab Store
const tabStore = useTabStore();
tabStore.loadTabs(); // 加载保存的 tabs 状态
const route = useRoute();
const router = useRouter();

// 引入 Menu Store
import { useMenuStore } from '@/stores/menu';
const menuStore = useMenuStore();

// 切换 Tab
const changeTab = (path) => {
  tabStore.setActiveTab(path); // 更新 Store 中的激活状态
  menuStore.setActiveMenu(path); // 更新菜单的选中状态
  router.push(path); // 切换路由
};

// 关闭 Tab
const closeTab = (path) => {
  tabStore.removeTab(path); // 从 Store 中移除 Tab
  if (tabStore.activeTab === path) {
    const remainingTabs = tabStore.tabs.filter(tab => tab.path !== path);
    if (remainingTabs.length > 0) {
      changeTab(remainingTabs[0].path); // 切换到第一个 Tab
    } else {
      router.push('/'); // 如果没有 Tab 了，跳转到首页或其他默认路径
    }
  }
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
</style>