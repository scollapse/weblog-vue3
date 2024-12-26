import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  // 是否展开左边栏菜单
  const isSidebarCollapsed = ref(false);
  
  // 展开或伸缩左边栏菜单
  function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  }
  
  return { isSidebarCollapsed, toggleSidebar }
})
