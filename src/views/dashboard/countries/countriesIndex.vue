<template>
  <div class="countries">
    <header-pages title="الدوله" button="+ اضافة دوله" link="/add-countries" />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsCountries"
      :pages="tablePages"
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
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useCountriesStore } from "@/stores/countries/countriesStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { mapState } from "pinia";

export default {
  data() {
    return {
      tableHeaders: ["ID", "الاسم", "الكود", "رمز الهاتف"],
    };
  },
  components: {
    headerPages,
    TablesPageVue,
    PaginationPage,
  },
  computed: {
    ...mapState(useCountriesStore, {
      countries: (state) => state.countries,
    }),
    ...mapState(usePaginationStore, {
      paginationCurrent: (state) => state.current_page,
      paginationFrom: (state) => state.from,
      paginationLast: (state) => state.last_page,
      paginationPer: (state) => state.per_page,
      paginationTo: (state) => state.to,
      paginationTotal: (state) => state.total,
    }),
    tableRowsCountries() {
      return this.countries.map((count) => [
        count.id,
        count.title,
        count.code,
        count.phone_code,
      ]);
    },
    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    async handleDeleteCountry(id) {
      const countriesStore = useCountriesStore();
      await countriesStore.deleteCountry(id);
    },
    handlePageChange(page) {
      const countriesStore = useCountriesStore();
      countriesStore.fetchCountries(page);
    },
  },
  mounted() {
    const countriesStore = useCountriesStore();
    countriesStore.fetchCountries(this.paginationCurrent);
    console.log("mounted", this.paginationLast);
  },
};
</script>
