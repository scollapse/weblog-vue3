import { computed } from 'vue';
import { useClickOutside } from '@/composables/utils/useClickOutside';
import { useMenuStore } from '@/stores/menu';
import { useFullscreen } from '@vueuse/core';

export function useHeader() {
  const { isFullscreen, toggle } = useFullscreen();
  const menuStore = useMenuStore();
  const isSidebarCollapsed = computed(() => menuStore.isSidebarCollapsed);
  const toggleSidebar = () => {
    menuStore.toggleSidebar();
  };
  const { isDropdownOpen, dropdown, toggleDropdown } = useClickOutside();

  return {
    isFullscreen,
    toggle,
    isSidebarCollapsed,
    toggleSidebar,
    isDropdownOpen,
    dropdown,
    toggleDropdown,
  };
}
