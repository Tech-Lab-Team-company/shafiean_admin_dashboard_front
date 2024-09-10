<template>
  <div class="countries">
    <header-pages title="الدوله" button="+ اضافة دوله" link="/add-countries" />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsCountries"
      :pages="tablePages"
      :showSelect="false"
      editLink="/edit-countries"
      viewLink="/view-countries"
      @delete="handleDeleteCountry"
    />
    <PaginationPage
      :currentPage="paginationCurrent"
      :totalPages="paginationLast"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useCountriesStore } from "@/stores/countries/countriesStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { mapState } from "pinia";
export default {
  components: {
    headerPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
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

      return this.countries.map((count) => [
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
  },
};
</script>
