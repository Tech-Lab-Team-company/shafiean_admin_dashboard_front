<template>
  <div class="plus">
    <i class="fa-solid fa-pen-to-square"></i>
    <header-pages title="تعديل المدينه" :showButton="false" />
  </div>
  <div class="add-countries">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم المدينه</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المدينه"
              v-model="Cities.title"
            />

            <span class="error-feedback" v-if="v$.Cities.title.$error">{{
              getErrorMessage(v$.Cities.title)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Country">أختر الدوله </label>
          <multiselect
            id="Country"
            v-model="Country_values"
            :options="CountryOptions"
            track-by="id"
            label="title"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            @update:model-value="updatecountryValue"
          ></multiselect>
          <span class="error-feedback" v-if="v$.Cities.country_id.$error">
            {{ getErrorMessage(v$.Cities.country_id) }}</span
          >
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
import { useCitiesEditStore } from "@/stores/Cities/CitiesEditStore";
import { mapState } from "pinia";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      v$: useVuelidate(),
      Cities: {
        title: "",
        country_id: "",
      },
      Country_values: null, // Initialize with null
      CountryOptions: [],
    };
  },

  validations() {
    return {
      Cities: {
        title: { required },
        country_id: { required },
      },
    };
  },
  components: {
    Multiselect,
    headerPages,
  },
  computed: {
    ...mapState(useCitiesEditStore, {
      countries: (state) => state.countries,
    }),
  },
  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    updatecountryValue() {
      this.Cities.country_id = this.Country_values
        ? this.Country_values.id
        : null;
      console.log("Selected Country ID:", this.Cities.country_id);
    },

    async fetchData() {
      const store = useCitiesEditStore();
      const id = this.$route.params.id;

      await store.fetchCities(id);
      this.Cities = store.cities;
      this.Country_values = this.CountryOptions.find(
        (country) => country.id === this.Cities.country_id
      );
    },

    async submitForm() {
      const store = useCitiesEditStore();
      const id = this.$route.params.id;
      await store.updateCities(id, {
        title: this.Cities.title,
        country_id: this.Cities.country_id,
      });

      if (!this.Cities.title || !this.Cities.country_id) {
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      } else {
        Swal.fire("Success", "تم تعديل المدينه بنجاح", "success");
      }
      this.$router.go(-1);
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
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
