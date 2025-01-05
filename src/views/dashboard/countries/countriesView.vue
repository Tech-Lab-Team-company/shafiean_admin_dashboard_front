<template>
  <div class="edit-countries">
    <div class="plus">
      <!-- <i class="fa-solid fa-eye-to-square"></i> -->
      <header-pages title="تفاصيل دوله" link="/countries" :showButton="false" />
    </div>
    <div class="countries-view">
      <div class="row g-4">
        <div class="col-lg-6 col-md-6 col-12">
          <p>اسم الدوله</p>

          <span class="data">{{ countries.title }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>كود الدوله</p>

          <span class="data">{{ countries.code }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>كود الهاتف</p>

          <span class="data">{{ countries.phone_code }}</span>
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
import { useCountriesEditStore } from "@/stores/countries/countriesEditStore";

export default {
  components: { headerPages },
  data() {
    return {
      countries: {
        title: "",
        code: "",
        image: null,
        phone_code: "",
      },
    };
  },

  methods: {
    async fetchData() {
      const store = useCountriesEditStore();
      const id = this.$route.params.id;

      await store.fetchCountries(id);
      this.countries = store.countries;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.countries-view {
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
