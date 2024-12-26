import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';
import { useTabStore } from '@/stores/tab';

export function useSidebar() {
  const menuStore = useMenuStore();
  const tabStore = useTabStore();
  const collapsed = computed(() => menuStore.isSidebarCollapsed);
  const activeMenu = computed(() => menuStore.activeMenu);
  const router = useRouter();
  const route = useRoute();

  const menuItems = ref([
    { name: '仪表盘', link: '/admin/index', icon: 'fas fa-tachometer-alt' },
    { name: '文章管理', link: '/admin/article/list', icon: 'fas fa-file-alt' },
    { name: '分类管理', link: '/admin/category/list', icon: 'fas fa-th-list' },
    { name: '标签管理', link: '/admin/tag/list', icon: 'fas fa-tags' },
    { name: '博客设置', link: '/admin/blog/setting', icon: 'fas fa-cogs' },
  ]);

  watch(
    () => activeMenu.value,
    (newActiveMenu) => {
      menuItems.value.forEach(item => {
        item.selected = item.link === newActiveMenu;
      });
    },
    { immediate: true }
  );

  const navigateTo = (link) => {
    const selectedItem = menuItems.value.find(item => item.link === link);
    if (selectedItem) {
      tabStore.addTab({ title: selectedItem.name, path: selectedItem.link });
      tabStore.setActiveTab(selectedItem.link);
      menuStore.setActiveMenu(selectedItem.link);
    }
    router.push(link);
  };

  return {
    collapsed,
    activeMenu,
    menuItems,
    navigateTo,
  };
}
