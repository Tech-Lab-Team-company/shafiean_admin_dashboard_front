<template>
  <div class="add-countries">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="تعديل سنه دراسيه" :showButton="false" />
    </div>

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
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Country">أختر الدوله</label>
          <multiselect
            id="Country"
            v-model="years.country"
            :options="CountryOptions"
            track-by="id"
            label="title"
            deselect-label=""
            select-label=""
            :close-on-select="true"
          ></multiselect>
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
import { mapState } from "pinia";

export default {
  components: {
    headerPages,
    Multiselect,
  },

  data() {
    return {
      years: {
        title: "",
        country: "",
      },
      Country_values: {},
      CountryOptions: [],
    };
  },
  computed: {
    ...mapState(useYearsEditStore, {
      countries: (state) => state.countries,
    }),
  },

  methods: {
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
        country_id: this.years.country.id,
      });
    },

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
  },

  mounted() {
    this.fetchData();
  },
};
</script>
