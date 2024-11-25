<template>
  <div class="edit-countries">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="تعديل دوله" link="/countries" :showButton="false" />
    </div>
    <form action="" @submit.prevent="updatecountries">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدوله</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم الدوله"
              v-model="countries.title"
            />
            <span class="error-feedback" v-if="v$.countries.title.$error">{{
              getErrorMessage(v$.countries.title)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود الدوله</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود الدوله"
              v-model="countries.code"
              class="no-spinner"
            />
            <span class="error-feedback" v-if="v$.countries.code.$error">{{
              getErrorMessage(v$.countries.code)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود الهاتف</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود الدوله"
              v-model="countries.phone_code"
              class="no-spinner"
            />
            <span
              class="error-feedback"
              v-if="v$.countries.phone_code.$error"
              >{{ getErrorMessage(v$.countries.phone_code) }}</span
            >
          </div>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save" @click="Edit()">تعديل</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useCountriesEditStore } from "@/stores/countries/countriesEditStore";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Swal from "sweetalert2";

export default {
  components: { headerPages },
  data() {
    return {
      v$: useVuelidate(),
      countries: {
        title: "",
        code: "",
        image: null,
        phone_code: "",
      },
    };
  },

  validations() {
    return {
      countries: {
        title: { required },
        code: { required },
        phone_code: { required },
      },
    };
  },
  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
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
      if (
        !this.countries.title ||
        !this.countries.code ||
        !this.countries.phone_code
      ) {
      }
      this.$router.go(-1);
    },
    Edit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("no error");
      }
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
