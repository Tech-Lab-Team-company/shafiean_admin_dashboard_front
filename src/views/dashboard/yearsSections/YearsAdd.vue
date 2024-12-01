<template>
  <div class="add-countries">
    <div class="plus">
      <i class="fa-solid fa-plus"></i>
      <header-pages title="اضافة سنه دراسيه" :showButton="false" />
    </div>

    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">أسم السنه</label>
          <div class="input">
            <input
              type="text"
              placeholder="أسم السنه"
              v-model="form.title"
              required
            />
          </div>
          <span class="error-feedback" v-if="v$.form.title.$error"
            >{{ getErrorMessage(v$.form.title) }}
          </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Country">أختر الدوله</label>
          <multiselect
            id="Country"
            v-model="form.Country_values"
            :options="CountryOptions"
            track-by="id"
            label="title"
            placeholder="أختر الدوله"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            @update:model-value="updatecountryValue"
          ></multiselect>

          <span class="error-feedback" v-if="v$.form.country_id.$error">{{
            getErrorMessage(v$.form.country_id)
          }}</span>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save" @click="save()">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useYearsAddStore } from "@/stores/Years/YeaesAddStore";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import Swal from "sweetalert2";
import { required } from "@vuelidate/validators";

import useVuelidate from "@vuelidate/core";

export default {
  components: {
    headerPages,
    Multiselect,
  },

  data() {
    return {
      v$: useVuelidate(),
      form: {
        title: "",
        country_id: "",
      },
      Country_values: {},
      CountryOptions: [],
    };
  },

  validations() {
    return {
      form: {
        title: { required },
        country_id: { required },
      },
    };
  },

  computed: {
    countries() {
      const store = useYearsAddStore();
      return store.countries;
    },
  },

  methods: {
    updatecountryValue(selected) {
      this.Country_values = selected;
      this.form.country_id = selected ? selected.id : null;
      console.log("Country_values", this.form.country_id);
    },
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    async submitForm() {
      try {
        const YearsStore = useYearsAddStore();
        if (!this.form.title || !this.form.country_id) {
          Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await YearsStore.addYear(this.form);
        this.$router.push("/years");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },

    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("no error");
      }
    },
  },

  async mounted() {
    const YearsStore = useYearsAddStore();
    await YearsStore.fetchCountries();
    this.CountryOptions = YearsStore.countries;
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
