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
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

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
      errorMessage: "",
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
    handleInputChange() {
      this.errorMessage = "";
      this.debouncedSearch();
    },
    async handleSearch() {
      const yearsStore = useYearsStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await yearsStore.getYears(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await yearsStore.getYears(1, this.word);

      if (yearsStore.years.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
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
<style scoped>
.error-message {
  color: white;
  background-color: #ef0000a3;
  margin-top: -39px;
  margin-right: 23px;
  width: 97.4%;
  margin-bottom: -25px;
  padding: 8px;
  text-align: center;
  border-radius: 3px;
}
</style>
