<template>
  <div class="Curricula-add">
    <header-pages title="اضافة منهج" :showButton="false" />
    <form action="" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المنهج</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المنهج"
              v-model="Curriculas.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">رقم المنهج</label>
          <div class="input">
            <input
              type="number"
              placeholder="نوع المنهج"
              v-model="Curriculas.type"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> المنهج</label>
          <div class="input">
            <input
              type="number"
              placeholder="نوع المنهج"
              v-model="Curriculas.status"
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
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useCurriculumAddStore } from "@/stores/curricula/curriculaAddStore";

import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "CurriculaAdd",
  components: {
    HeaderPages,
  },
  data() {
    return {
      Curriculas: {
        title: "",
        type: "",
        status: "",
      },
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async submitForm() {
      try {
        const curriculaStore = useCurriculumAddStore();
        if (!curriculaStore) {
          throw new Error("Failed to load Curriculas store");
        }
        await curriculaStore.addCurriculasData(this.Curriculas);
        this.$router.push("/Curricula");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
  },
};
</script>
