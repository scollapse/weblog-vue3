<template>
    <nav class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <ul class="flex space-x-4">
        <li
          v-for="tab in tabs"
          :key="tab.name"
          @click="selectTab(tab)"
          :class="[
            'cursor-pointer px-4 py-2 rounded',
            tab.isActive
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-400',
          ]"
        >
          {{ tab.name }}
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const tabs = reactive([
    { name: 'Overview', isActive: true },
    { name: 'Reports', isActive: false },
    { name: 'Analytics', isActive: false },
  ]);
  
  const selectTab = (selectedTab) => {
    tabs.forEach((tab) => (tab.isActive = tab === selectedTab));
  };
  </script>