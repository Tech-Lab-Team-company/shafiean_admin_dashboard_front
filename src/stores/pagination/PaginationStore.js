import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", {
  state: () => ({
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 1,
    to: 0,
    total: 0,
  }),

  actions: {
    setPage(page) {
      this.current_page = page;
    },
    setfrom(from) {
      this.from = from;
    },
    setlastpage(lastpage) {
      this.last_page = lastpage;
    },
    setperpage(perpage) {
      this.per_page = perpage;
    },
    setto(to) {
      this.to = to;
    },
    settotal(total) {
      this.total = total;
    },
  },
});
