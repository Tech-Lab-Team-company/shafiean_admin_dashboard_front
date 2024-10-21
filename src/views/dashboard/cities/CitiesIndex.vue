<template>
  <header-pages title="المدن" button="+ اضافة مدينة" link="/add-cities" />
  <div class="search">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input
      type="text"
      placeholder="بحث عن موظف..."
      v-model="word"
      @input="debouncedSearch"
    />
  </div>
  <tables-page-vue
    :headers="tableHeaders"
    :rows="tableRowsCities"
    :pages="tablePages"
    :showSelect="false"
    editLink="/edit-cities"
    viewLink="/view-cities"
    @delete="handleDeleteCities"
  />
  <PaginationPage
    :currentPage="paginationCurrent"
    :totalPages="paginationLast"
    @page-changed="handlePageChange"
  />
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useCitiesStore } from "@/stores/Cities/CitiesStore";
import { mapState } from "pinia";
import { debounce } from "lodash";

export default {
  components: { headerPages, TablesPageVue, PaginationPage },
  data() {
    return {
      word: "",
      debouncedSearch: null,
      tableHeaders: ["ID", "اسم المدينة"],
    };
  },
  computed: {
    ...mapState(useCitiesStore, {
      cities: (state) => state.cities,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
    }),

    tableRowsCities() {
      // console.log(this.cities, "Diiaaaa");
      const dataToDisplay = this.cities;
      return dataToDisplay.map((cit) => [cit.id, cit.title]);
    },
    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    handleSearch() {
      const CitiesStore = useCitiesStore();
      CitiesStore.fetchCities(1, this.word);
    },
    handlePageChange(page) {
      const CitiesStore = useCitiesStore();
      CitiesStore.fetchCities(page);
    },
    async handleDeleteCities(id) {
      const CitiesStore = useCitiesStore();
      console.log(id);

      await CitiesStore.deleteCities(id);
    },
  },
  mounted() {
    const CitiesStore = useCitiesStore();
    CitiesStore.fetchCities();
    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700);
  },
};
</script>
