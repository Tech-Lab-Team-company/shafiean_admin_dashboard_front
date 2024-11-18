<template>
  <div class="add-countries">

    <div class="plus">
      <i class="fa-solid fa-plus"></i>
      <header-pages title="اضافة دوله" link="/countries" :showButton="false" />
    </div>


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
              class="no-spinner"
              v-model="countries.code"
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
              class="no-spinner"
              placeholder="كود الدوله"
              v-model="countries.phone_code"
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
        <button type="submit" class="save" @click="save()">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useCountriesAddStore } from "@/stores/countries/countriesAddStore";
// import Swal from "sweetalert2";
import { required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useVuelidate(),
      countries: {
        title: "",
        code: "",
        phone_code: "",
      },
    };
  },
  validations() {
    return {
      countries: {
        title: { required },
        code: { required, minValue: minValue(1) },
        phone_code: { required, minValue: minValue(1) },
      },
    };
  },
  components: {
    headerPages,
  },
  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        if (field.required.$invalid) {
          return "هذا الحقل مطلوب";
        } else if (field.minValue.$invalid) {
          return "يجب ان يكون القيمة اكبر من 0";
        }
      }
      return "";
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async submitForm() {
      try {
        const countriesStore = useCountriesAddStore();
        if (!countriesStore) {
          throw new Error("Failed to load Country store");
        }
        if (
          !this.countries.title ||
          !this.countries.code ||
          !this.countries.phone_code
        ) {
          // Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await countriesStore.addCountriesData(this.countries);

        this.$router.push("/countries");
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
