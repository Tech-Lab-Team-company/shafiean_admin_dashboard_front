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
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useCountriesStore } from "@/stores/countries/countriesStore";
import { mapState } from "pinia";
export default {
  components: {
    headerPages,
    TablesPageVue,
  },
  data() {
    return {
      tableHeaders: ["ID", "اسم الدوله", "كود الدوله", "  كود الهاتف "],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    ...mapState(useCountriesStore, {
      countries: (state) => state.countries,
      pages: (state) => state.pages,
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
  },
  methods: {
    async handleDeleteCountry(id) {
      const countriesStore = useCountriesStore();
      console.log(id);

      await countriesStore.deleteCountry(id);
    },
  },

  mounted() {
    const countriesStore = useCountriesStore();
    countriesStore.fetchCountries();
  },
};
</script>
