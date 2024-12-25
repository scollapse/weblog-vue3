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
  
        <!-- 主体内容 -->
        <main
          :class="[
            'flex-grow p-6 bg-gray-100 overflow-y-auto',
            isSidebarCollapsed ? 'ml-16' : 'ml-64'
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
  import { ref } from 'vue';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  
  // 控制侧边栏折叠状态
  const isSidebarCollapsed = ref(false);
  
  // 处理从 Header 传递的折叠事件
  const handleSidebarToggle = (collapsed) => {
    // 打印折叠状态以便调试
    console.log('Sidebar collapsed:', collapsed);
    isSidebarCollapsed.value = collapsed;
  };
  </script>