<template>
  <div class="add-countries">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="تعديل سنه دراسيه" :showButton="false" />
    </div>

    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- الاسم -->
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
import { useYearsEditStore } from "@/stores/Years/YearsEditStore";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { toHijri, toGregorian } from "hijri-converter";

export default {
  components: {
    headerPages,
    Multiselect,
  },

  data() {
    return {
      form: {
        title: "",
        country_id: "",
        Country_values: {},
        gregorianDateRaw: "",
        hijriDateRaw: "",
      },
      CountryOptions: [],
    };
  },

  methods: {
    async fetchData() {
      const store = useYearsEditStore();
      const id = this.$route.params.id;
      await store.fetchYears(id);
      const year = store.years;

      this.form.title = year.title;
      this.form.country_id = year.country?.id || year.country; // support both object and ID
      this.form.Country_values = this.CountryOptions.find(
        (country) => country.id === this.form.country_id
      );

      this.form.gregorianDateRaw = year.start_date;
      this.form.hijriDateRaw = year.hijri_end_date;
    },

    async fetchCountries() {
      const store = useYearsEditStore();
      await store.getCountries();
      this.CountryOptions = store.countries || [];
    },

    parseDateToInput(dateStr) {
      if (!dateStr) return "";
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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

    updatecountryValue(selected) {
      this.form.Country_values = selected;
      this.form.country_id = selected ? selected.id : null;
    },

    async submitForm() {
      const store = useYearsEditStore();
      const id = this.$route.params.id;

      const payload = {
        title: this.form.title,
        country_id: this.form.country_id,
        start_date: this.formatDate(this.form.gregorianDateRaw),
        hijri_start_date: this.formatDate(this.form.hijriDateRaw),
      };

      await store.updateYears(id, payload);
      this.$router.push("/years");
    },
  },

  async mounted() {
    await this.fetchCountries();
    await this.fetchData();
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
</style>
