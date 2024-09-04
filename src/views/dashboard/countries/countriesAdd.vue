<template>
  <div class="add-countries">
    <header-pages title="اضافة دوله" link="/countries" :showButton="false" />

    <form @submit.prevent="submitForm">
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
              type="text"
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
        <button type="submit" class="save">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useCountriesAddStore } from "@/stores/countries/countriesAddStore";
export default {
  data() {
    return {
      countries: {
        title: "",
        code: "",
        phone_code: "",
      },
    };
  },
  components: {
    headerPages,
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async submitForm() {
      try {
        const countriesStore = useCountriesAddStore();
        if (!countriesStore) {
          throw new Error("Failed to load Country store");
        }
        await countriesStore.addCountriesData(this.countries); // Call addEmployee instead of fetchEmployees
        this.$router.push("/countries");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
  },
};
</script>
