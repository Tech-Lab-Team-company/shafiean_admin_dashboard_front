<template>
  <div class="add-countries">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدوله</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم الدوله"
              v-model="Cities.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود الدوله</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود الدوله"
              v-model="Cities.country_id"
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
import { useCitiesAddStore } from "@/stores/Cities/CitiesAddStore";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      Cities: {
        title: "",
        country_id: "",
      },
    };
  },
  components: {},
  methods: {
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
  },
};
</script>
