<template>
  <div class="add-countries">
    <header-pages title="تعديل سنه دراسيه" :showButton="false" />

    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">أسم السنه</label>
          <div class="input">
            <input
              type="text"
              placeholder="أسم السنه"
              v-model="years.title"
              required
            />
          </div>
          <span class="error-feedback" v-if="v$.years.title.$error">
            {{ getErrorMessage(v$.years.title) }}
          </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Country">أختر الدوله</label>
          <multiselect
            id="Country"
            v-model="years.country"
            :options="CountryOptions"
            track-by="id"
            label="title"
            :close-on-select="true"
            @update:model-value="updatecountryValue"
          ></multiselect>

          <span class="error-feedback" v-if="v$.years.country_id.$error">
            {{ getErrorMessage(v$.years.country_id) }}
          </span>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save" @click="Edit()">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useYearsEditStore } from "@/stores/Years/YearsEditStore";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import Swal from "sweetalert2";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { mapState } from "pinia";

export default {
  components: {
    headerPages,
    Multiselect,
  },

  data() {
    return {
      v$: useVuelidate(),
      years: {
        title: "",
        country: "",
      },
      Country_values: {},
      CountryOptions: [],
    };
  },

  validations() {
    return {
      years: {
        title: { required },
        country_id: { required },
      },
    };
  },

  computed: {
    ...mapState(useYearsEditStore, {
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
      this.years.country_id = this.Country_values
        ? this.Country_values.id
        : null;
      console.log("Selected Country ID:", this.years.country_id);
    },

    async fetchData() {
      const store = useYearsEditStore();
      const id = this.$route.params.id;
      await store.fetchYears(id);
      this.years = store.years;
      await this.fetchEidtCountries();

      this.Country_values = this.CountryOptions.find(
        (country) => country.id === this.years.country
      );
    },
    async submitForm() {
      const store = useYearsEditStore();
      const id = this.$route.params.id;
      await store.updateYears(id, {
        title: this.years.title,
        country_id: this.years.country,
      });
      if (!this.years.title || !this.years.country) {
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      } else {
        Swal.fire("Success", "تم تعديل السنه الدراسيه بنجاح", "success");
      }
      this.$router.go(-1);
    },
    // async fetchEidtCountries() {
    //   const store = useYearsEditStore();
    //   try {
    //     await store.getCountries();
    //     this.CountryOptions = store.countries || [];
    //   } catch (error) {
    //     console.error("Error fetching countries:", error);
    //   }
    // },
    async fetchEidtCountries() {
      const store = useYearsEditStore();
      await store.getCountries();
      this.CountryOptions = store.countries || [];

      if (this.years.country) {
        this.Country_values = this.CountryOptions.find(
          (country) => country.id === this.years.country
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
    this.fetchData();
  },
};
</script>
