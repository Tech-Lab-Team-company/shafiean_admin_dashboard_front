<template>
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
            :close-on-select="true"
            @update:model-value="updatecountryValue"
          ></multiselect>
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useCitiesAddStore } from "@/stores/Cities/CitiesAddStore";
import Swal from "sweetalert2";
import { mapState } from "pinia";
export default {
  data() {
    return {
      Cities: {
        title: "",
        country_id: "",
      },
      Country_values: {},
      CountryOptions: [],
    };
  },
  components: {
    Multiselect,
  },
  computed: {
    ...mapState(useCitiesAddStore, {
      countries: (state) => state.countries,
    }),
  },
  methods: {
    updatecountryValue() {
      this.Cities.country_id = this.Country_values.id;
      console.log("Country_values", this.Cities.country_id);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async submitForm() {
      try {
        const CitiesStore = useCitiesAddStore();
        if (!CitiesStore) {
          throw new Error("Failed to load Country store");
        }

        if (!this.Cities.title || !this.Cities.country_id) {
          Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await CitiesStore.addCitiesData(this.Cities);
        this.$router.push("/cities");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
    async fetchCitiess() {
      try {
        const CitiesStore = useCitiesAddStore();
        if (!CitiesStore) {
          throw new Error("Failed to load organizations store");
        }

        await CitiesStore.getCountries();
        this.CountryOptions = this.countries;
      } catch (error) {
        console.error("Error in fetchCities:", error);
      }
    },
  },
  mounted() {
    this.fetchCitiess();
  },
};
</script>
