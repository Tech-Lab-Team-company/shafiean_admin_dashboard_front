<template>
  <div class="countries">
    <header-pages title="الدوله" button="+ اضافة دوله" link="/add-countries" />
    <div class="alll">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="بحث عن دوله..."
          v-model="word"
          @input="debouncedSearch"
        />
      </div>

      <TablesPageVue
        :headers="tableHeaders"
        :rows="tableRowsCountries"
        :pages="tablePages"
        :showSelect="false"
        editLink="/edit-countries"
        viewLink="/view-countries"
        @delete="handleDeleteCountry"
      />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <PaginationPage
        :currentPage="paginationCurrent"
        :totalPages="paginationLast"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useCountriesStore } from "@/stores/countries/countriesStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { debounce } from "lodash"; // استيراد دالة debounce

import { mapState } from "pinia";
export default {
  components: {
    headerPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
      word: "",
      debouncedSearch: null,
      errorMessage: "",
      tableHeaders: ["ID", "اسم الدوله", "كود الدوله", "  كود الهاتف "],
    };
  },
  computed: {
    ...mapState(useCountriesStore, {
      countries: (state) => state.countries,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
    }),
    tableRowsCountries() {
      console.log(this.countries, "Diiaaaa");
      const dataToDisplay = this.countries;
      return dataToDisplay.map((count) => [
        count.id,
        count.title,
        count.code,
        count.phone_code,
        // count.flag_url || null,
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
      const countriesStore = useCountriesStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await countriesStore.fetchCountries(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await countriesStore.fetchCountries(1, this.word);

      if (countriesStore.countries.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
    },

    async handleDeleteCountry(id) {
      const countriesStore = useCountriesStore();
      console.log(id);

      await countriesStore.deleteCountry(id);
    },
    handlePageChange(page) {
      const curriculaStore = useCountriesStore();
      curriculaStore.fetchCountries(page);
    },
  },

  mounted() {
    const countriesStore = useCountriesStore();
    countriesStore.fetchCountries();

    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
