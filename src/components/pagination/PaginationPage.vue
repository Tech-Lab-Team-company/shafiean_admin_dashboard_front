<template>
  <div class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !hasPreviousPage }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !hasNextPage }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

export default {
  name: "PaginationPage",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(usePaginationStore, {
      current_page: (state) => state.current_page,
      from: (state) => state.from,
      last_page: (state) => state.last_page,
      per_page: (state) => state.per_page,
      to: (state) => state.to,
      total: (state) => state.total,
    }),
    hasNextPage() {
      return this.current_page < this.total;
    },
    hasPreviousPage() {
      return this.current_page > 1;
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.total) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>
