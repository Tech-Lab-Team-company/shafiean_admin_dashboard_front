<template>
  <div class="years">
    <header-pages
      title=" السنوات الدراسية"
      button="+  اضافة سنة دراسية"
      link="/add-years"
    />
    <div class="search">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="بحث عن موظف..."
        v-model="word"
        @input="debouncedSearch"
      />
    </div>

    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsYears"
      :pages="tablePages"
      editLink="/edit-years"
      viewLink="/view-years"
      @delete="handleDeleteYears"
    />

    <PaginationPage
      :currentPage="paginationCurrent"
      :totalPages="paginationLast"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useYearsStore } from "@/stores/Years/YearsStore";
import { mapState } from "pinia";
import { debounce } from "lodash"; // استيراد دالة debounce

export default {
  components: {
    HeaderPages,
    TablesPageVue,
    PaginationPage,
  },

  data() {
    return {
      word: "", // الكلمة المدخلة في البحث
      debouncedSearch: null,
      tableHeaders: ["ID", "اسم السنة الدراسية", "الدوله"],
    };
  },

  computed: {
    ...mapState(useYearsStore, {
      years: (state) => state.years,
    }),
    ...mapState(usePaginationStore, {
      paginationCurrent: (state) => state.current_page,
      paginationFrom: (state) => state.from,
      paginationLast: (state) => state.last_page,
      paginationPer: (state) => state.per_page,
      paginationTo: (state) => state.to,
      paginationTotal: (state) => state.total,
    }),
    tableRowsYears() {
      const dataToDisplay = this.years;
      return dataToDisplay.map((yr) => [
        yr.id,
        yr.title,
        yr.country?.title || "",
      ]);
    },

    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },

  methods: {
    handleSearch() {
      const yearsStore = useYearsStore();
      yearsStore.getYears(1, this.word);
    },
    handleDeleteYears(id) {
      const yearsStore = useYearsStore();
      console.log(id);
      yearsStore.deleteYear(id);
    },
    handlePageChange(page) {
      const yearsStore = useYearsStore();
      yearsStore.getYears(page);
    },
  },
  async mounted() {
    const yearsStore = useYearsStore();
    await yearsStore.getYears();
    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
