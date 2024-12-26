<template>
    <aside :class="[
        'bg-gray-700 text-white h-screen shadow-md transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
    ]">
        <div class="p-4 text-lg font-bold flex items-center justify-center">
            <a href="/" class="text-white text-center">
                <span v-if="!collapsed">Weblog</span>
                <i v-else class="fas fa-bars"></i>
            </a>
        </div>
        <nav class="mt-4">
            <ul>
                <li v-for="item in menuItems" :key="item.name"
                    :class="['hover:bg-gray-600 mb-2 last:border-0', { 'bg-gray-600': item.selected }]">
                    <a @click="navigateTo(item.link)" class="block px-4 py-3 transition flex items-center">
                        <i :class="item.icon" class="mr-3 text-lg"></i>
                        <span v-if="!collapsed">{{ item.name }}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useTabStore } from '@/stores/tab';

const menuStore = useMenuStore();
const tabStore = useTabStore();

const collapsed = computed(() => menuStore.isSidebarCollapsed);
const activeMenu = computed(() => menuStore.activeMenu);

const router = useRouter();

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

function navigateTo(link) {
    const selectedItem = menuItems.value.find(item => item.link === link);
    if (selectedItem) {
        tabStore.addTab({ title: selectedItem.name, path: selectedItem.link });
        tabStore.setActiveTab(selectedItem.link);
        menuStore.setActiveMenu(selectedItem.link);
    }
    router.push(link);
}
</script>

<style scoped></style>
