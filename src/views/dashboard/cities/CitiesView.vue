<template>
  <div class="plus">
    <!-- <i class="fa-solid fa-pen-to-square"></i> -->
    <header-pages title="تفاصيل المدينه" :showButton="false" />
  </div>
  <div class="add-countries">
    <div class="cities-view">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <p>اسم المدينه</p>

          <span class="data">{{ Cities.title }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>الدوله</p>

          <span class="data"> {{ Country_values?.title }}</span>
        </div>
      </div>
      <div class="all-btn">
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useCitiesEditStore } from "@/stores/Cities/CitiesEditStore";

export default {
  data() {
    return {
      Cities: {
        title: "",
        country_id: "",
      },
      Country_values: null, // Initialize with null
      CountryOptions: [],
    };
  },

  components: {
    headerPages,
  },

  methods: {
    async fetchData() {
      const store = useCitiesEditStore();
      const id = this.$route.params.id;

      await store.fetchCities(id);
      this.Cities = store.cities;
      this.Country_values = this.CountryOptions.find(
        (country) => country.id === this.Cities.country_id
      );
    },

    async fetchEidtCountries() {
      const store = useCitiesEditStore();
      await store.getCountries();
      this.CountryOptions = store.countries;

      if (this.Cities.country_id) {
        this.Country_values = this.CountryOptions.find(
          (country) => country.id === this.Cities.country_id
        );
      }
    },

    Edit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("no error");
      }
    },
  },

  mounted() {
    this.fetchEidtCountries();
    this.fetchData();
  },
};
</script>
<style scoped>
.cities-view {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
}
p {
  color: #000;
  font-weight: bold;
}

.data {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
}
</style>
