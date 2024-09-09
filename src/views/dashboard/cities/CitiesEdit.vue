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
              v-model="cities.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود المدينه</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود المدينه"
              v-model="cities.country_id"
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
import { useCitiesEditStore } from "@/stores/Cities/CitiesEditStore";
export default {
  data() {
    return {
      cities: [],
    };
  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async fetchData() {
      const store = useCitiesEditStore();
      const id = this.$route.params.id;

      await store.fetchCities(id);
      this.cities = store.cities;
    },
    async submitForm() {
      const store = useCitiesEditStore();
      const id = this.$route.params.id;
      await store.updateCities(id, {
        title: this.cities.title,
        country_id: this.cities.country_id,
      });
      this.$router.go(-1);
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
