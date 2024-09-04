<template>
  <div class="edit-countries">
    <header-pages title="تعديل دوله" link="/countries" :showButton="false" />
    <form action="" @submit.prevent="editCountries">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدوله</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم الدوله"
              v-model="countries.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود الدوله</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود الدوله"
              v-model="countries.code"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود الهاتف</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود الدوله"
              v-model="countries.phone_code"
            />
          </div>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save">تعديل</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
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
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async fetchData() {
      const store = useCountriesEditStore();
      const id = this.$route.params.id;

      await store.fetchCountries(id);
      this.countries = store.countries;
    },
    async updatecountries() {
      const store = useCountriesEditStore();
      const id = this.$route.params.id;
      await store.updateCountries(id, {
        title: this.countries.title,
        code: this.countries.code,
        phone_code: this.countries.phone_code,
      });
      this.$router.go(-1);
    },
  },
};
</script>
