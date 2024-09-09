<template>
  <header-pages title="المدن" button="+ اضافة مدينة" link="/add-cities" />
  <tables-page-vue
    :headers="tableHeaders"
    :rows="tableRowsCities"
    :pages="tablePages"
    editLink="/edit-cities"
    viewLink="/view-cities"
    @delete="handleDeleteCities"
  />
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useCitiesStore } from "@/stores/Cities/CitiesStore";
import { mapState } from "pinia";

export default {
  components: { headerPages, TablesPageVue },
  data() {
    return {
      tableHeaders: ["ID", "اسم المدينة", "كود المدينة"],
    };
  },
  computed: {
    ...mapState(useCitiesStore, {
      cities: (state) => state.cities,
    }),

    tableRowsCities() {
      console.log(this.cities, "Diiaaaa");
      return this.cities.map((cit) => [cit.id, cit.title, cit.country_id]);
    },
  },
  methods: {
    async handleDeleteCities(id) {
      const citiesStore = useCitiesStore();
      console.log(id);

      await citiesStore.deleteCities(id);
    },
  },
  mounted() {
    const citiesStore = useCitiesStore();
    citiesStore.fetchCities();
  },
};
</script>
