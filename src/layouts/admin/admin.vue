<template>
    <div class="flex h-screen">
      <!-- 左侧侧边栏 -->
      <aside
        :class="[
          'transition-all duration-300 ease-in-out',
          isSidebarCollapsed ? 'w-16' : 'w-64'
        ]"
      >
        <Sidebar :collapsed="isSidebarCollapsed" />
      </aside>
  
      <!-- 主内容区域 -->
      <div class="flex flex-col flex-grow">
        <!-- 顶部导航栏 -->
        <Header @sidebar-toggle="handleSidebarToggle" />
  
        <!-- TabList -->
        <TabList />
  
        <!-- 主体内容 -->
        <main
          :class="[
            'flex-grow p-6  overflow-y-auto',
            isSidebarCollapsed ? 'ml-16' : 'ml-32'
          ]"
        >
          <router-view />
        </main>
  
        <!-- 底部页脚 -->
        <Footer />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch  } from 'vue';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import TabList from '@/components/TabList.vue';
  
  import { useMenuStore } from '@/stores/menu';
  import { useTabStore } from '@/stores/tab';
  
  const menuStore = useMenuStore();
  const tabStore = useTabStore();
  
  // 侧边栏折叠状态
  const isSidebarCollapsed = computed(() => menuStore.isSidebarCollapsed);
  
  // 监听激活的 Tab 变化
  const activeTab = computed(() => tabStore.activeTab);
  
  // 打印激活的 Tab ID（可用作调试或导航控制）
  watch(
    () => activeTab.value,
    (newTab) => {
      console.log('Active Tab Changed:', newTab);
    }
  );
  </script>