import { defineStore } from 'pinia';

export const useTabStore = defineStore('tab', {
    state: () => ({
        tabs: [
            { title: '仪表盘', path: '/admin/index' },
            { title: '文章管理', path: '/admin/article/list' },
            { title: '分类管理', path: '/admin/category/list' },
            { title: '标签管理', path: '/admin/tag/list' },
            { title: '博客设置', path: '/admin/blog/setting' },
        ],
        activeTab: '/admin/index', // 默认激活的 Tab path
    }),
    actions: {
        setActiveTab(tabPath) {
            this.activeTab = tabPath;
            this.saveTabs();
        },
        addTab(tab) {
            if (!this.tabs.find(t => t.path === tab.path)) {
                this.tabs.push(tab);
                this.saveTabs();
            }
        },
        removeTab(path) {
            this.tabs = this.tabs.filter(tab => tab.path !== path);
            this.saveTabs();
        },
        saveTabs() {
            localStorage.setItem('tabs', JSON.stringify(this.tabs));
            localStorage.setItem('activeTab', this.activeTab);
        },
        loadTabs() {
            const savedTabs = localStorage.getItem('tabs');
            const savedActiveTab = localStorage.getItem('activeTab');
            if (savedTabs) {
                this.tabs = JSON.parse(savedTabs);
            }
            if (savedActiveTab) {
                this.activeTab = savedActiveTab;
            }
        }
    },
});
