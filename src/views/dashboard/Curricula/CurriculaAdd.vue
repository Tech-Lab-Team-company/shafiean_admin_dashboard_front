<template>
  <div class="Curricula-add">
    <header-pages title="اضافة منهج" :showButton="false" />
    <form action="" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">أسم المنهج</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المنهج"
              v-model="Curriculas.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">نوع المنهج</label>
          <multiselect
            id="type"
            v-model="selectedType"
            :options="typeOptions"
            :close-on-select="true"
            label="name"
            track-by="id"
            @update:model-value="updateTypeId"
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
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useCurriculumAddStore } from "@/stores/curricula/curriculaAddStore";

export default {
  name: "CurriculaAdd",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      Curriculas: {
        title: "",
        type: null,
      },
      typeOptions: [
        { id: 1, name: "قرأن" },
        { id: 2, name: "حديث" },
        { id: 3, name: "فقه" },
      ],
      selectedType: null,
    };
  },
  methods: {
    updateTypeId(selectedOption) {
      this.Curriculas.type = selectedOption ? selectedOption.id : null;
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
