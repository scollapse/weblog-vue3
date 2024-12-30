<template>
  <div class="flex items-center justify-between p-4 bg-white rounded-xl shadow-md">
    <!-- 数据信息 -->
    <div class="text-sm text-gray-600">
      总数据量：{{ total }} | 每页：{{ pageSize }} | 当前页：{{ currentPage }}
    </div>
    <!-- 分页 -->
    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm">
        <!-- 上一页 -->
        <li>
          <button
            @click="onPrev"
            :disabled="currentPage === 1"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-purple-500  border border-e-0 border-gray-300 rounded-s-lg hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            上一页
          </button>
        </li>
        <!-- 页码 -->
        <li
          v-for="page in pages"
          :key="page"
          :class="{'bg-purple-50 text-purple-600': page === currentPage, 'text-gray-500 hover:text-purple-700': page !== currentPage}"
        >
            <button
            @click="goToPage(page)"
            :class="{'flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-purple-100 rounded': true, 'text-purple-800 font-bold': page === currentPage}"
          >
            {{ page }}
          </button>
        </li>
        <!-- 下一页 -->
        <li>
          <button
            @click="onNext"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-purple-500 border border-e-0 border-gray-300 rounded-e-lg hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    onPrev: {
      type: Function,
      required: true,
    },
    onNext: {
      type: Function,
      required: true,
    },
    onPageClick: {
      type: Function,
      required: true,
    },
  },
  computed: {
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    goToPage(page) {
      this.onPageClick(page);
    },
  },
};
</script>