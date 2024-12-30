import { ref, computed } from "vue";

export default function usePagination() {
  const total = ref(0);
  const pageSize = ref(10);
  const currentPage = ref(1);

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  const setTotal = (newTotal) => {
    total.value = newTotal;
  };

  const setPageSize = (newPageSize) => {
    pageSize.value = newPageSize;
  };

  const setCurrentPage = (newCurrentPage) => {
    currentPage.value = newCurrentPage;
  };

  return {
    total,
    pageSize,
    currentPage,
    totalPages,
    setTotal,
    setPageSize,
    setCurrentPage,
  };
}
