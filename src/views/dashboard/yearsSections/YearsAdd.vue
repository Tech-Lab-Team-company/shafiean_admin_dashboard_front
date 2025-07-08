<template>
  <div class="add-countries">
    <div class="plus">
      <i class="fa-solid fa-plus"></i>
      <header-pages title="اضافة سنه دراسيه" :showButton="false" />
    </div>

    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- اسم السنة -->
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
          <span class="error-feedback" v-if="v$.form.title.$error">
            {{ getErrorMessage(v$.form.title) }}
          </span>
        </div>

        <!-- الدولة -->
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
          <span class="error-feedback" v-if="v$.form.country_id.$error">
            {{ getErrorMessage(v$.form.country_id) }}
          </span>
        </div>

        <!-- التاريخ الميلادي -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="gregorianDate">التاريخ الميلادي </label>
          <div class="input">
            <input
              type="date"
              v-model="form.gregorianDateRaw"
              @input="convertToHijri"
              required
            />
          </div>
          <span class="error-feedback" v-if="v$.form.gregorianDateRaw.$error">
            {{ getErrorMessage(v$.form.gregorianDateRaw) }}
          </span>
        </div>

        <!-- التاريخ الهجري -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="hijriDate">التاريخ الهجري </label>
          <div class="input">
            <input
              type="date"
              v-model="form.hijriDateRaw"
              @input="convertToGregorian"
              required
            />
          </div>
          <span class="error-feedback" v-if="v$.form.hijriDateRaw.$error">
            {{ getErrorMessage(v$.form.hijriDateRaw) }}
          </span>
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
import { toHijri, toGregorian } from "hijri-converter";

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
        gregorianDateRaw: "",
        hijriDateRaw: "",
        Country_values: {},
      },
      CountryOptions: [],
    };
  },

  validations() {
    return {
      form: {
        title: { required },
        country_id: { required },
        gregorianDateRaw: { required },
        hijriDateRaw: { required },
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
      this.form.Country_values = selected;
      this.form.country_id = selected ? selected.id : null;
    },

    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },

    formatDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-").map(Number);
      return `${String(day).padStart(2, "0")}/${String(month).padStart(
        2,
        "0"
      )}/${year}`;
    },

    convertToHijri() {
      if (this.form.gregorianDateRaw) {
        const [year, month, day] = this.form.gregorianDateRaw
          .split("-")
          .map(Number);
        const hijri = toHijri(year, month, day);
        this.form.hijriDateRaw = `${hijri.hy}-${String(hijri.hm).padStart(
          2,
          "0"
        )}-${String(hijri.hd).padStart(2, "0")}`;
      } else {
        this.form.hijriDateRaw = "";
      }
    },

    convertToGregorian() {
      if (this.form.hijriDateRaw) {
        const [hy, hm, hd] = this.form.hijriDateRaw.split("-").map(Number);
        const gregorian = toGregorian(hy, hm, hd);
        this.form.gregorianDateRaw = `${gregorian.gy}-${String(
          gregorian.gm
        ).padStart(2, "0")}-${String(gregorian.gd).padStart(2, "0")}`;
      } else {
        this.form.gregorianDateRaw = "";
      }
    },

    async submitForm() {
      try {
        const YearsStore = useYearsAddStore();

        // validation check
        if (
          !this.form.title ||
          !this.form.country_id ||
          !this.form.gregorianDateRaw ||
          !this.form.hijriDateRaw
        ) {
          Swal.fire("خطأ", "يرجى تعبئة جميع الحقول", "error");
          return;
        }

        // prepare formatted form without raw dates
        const formattedForm = {
          title: this.form.title,
          country_id: this.form.country_id,
          start_date: this.formatDate(this.form.gregorianDateRaw),
          hijri_start_date: this.formatDate(this.form.hijriDateRaw),
        };

        await YearsStore.addYear(formattedForm);
        this.$router.push("/years");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },

    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("no validation error");
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
.input {
  position: relative;
}
input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input.formatted-date {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>
