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
                    :class="['hover:bg-gray-600 mb-2 last:border-0', item.selected ? 'bg-gray-600' : '']">
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
import { ref,computed } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();

// 侧边栏折叠状态
const  collapsed = computed(() => menuStore.isSidebarCollapsed);

const route = useRoute();
const router = useRouter();

const menuItems = ref([
    { name: '仪表盘', link: '/admin/index', icon: 'fas fa-tachometer-alt', selected: false },
    { name: '文章管理', link: '/admin/article/list', icon: 'fas fa-file-alt', selected: false },
    { name: '分类管理', link: '/admin/category/list', icon: 'fas fa-th-list', selected: false },
    { name: '标签管理', link: '/admin/tag/list', icon: 'fas fa-tags', selected: false },
    { name: '博客设置', link: '/admin/blog/setting', icon: 'fas fa-cogs', selected: false },
]);

menuItems.value.forEach(item => {
    item.selected = item.link === route.path;
});

function navigateTo(link) {
    menuItems.value.forEach(item => {
        item.selected = item.link === link;
    });
    router.push(link);
}
</script>

<style scoped></style>