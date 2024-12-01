<template>
  <div class="Curricula-add">
    <div class="plus">
      <i class="fa-solid fa-plus"></i>
      <header-pages title="اضافة منهج" :showButton="false" />
    </div>
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
            <span class="error-feedback" v-if="v$.Curriculas.title.$error">{{
              getErrorMessage(v$.Curriculas.title)
            }}</span>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="">نوع المنهج</label>
          <multiselect
            id="type"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            v-model="selectedType"
            :options="typeOptions"
            label="name"
            track-by="id"
            placeholder="اختر نوع المنهج"
            @update:model-value="updateTypeId"
          ></multiselect>
          <span class="error-feedback" v-if="v$.Curriculas.type.$error">
            {{ getErrorMessage(v$.Curriculas.type) }}</span
          >
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
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useCurriculumAddStore } from "@/stores/curricula/curriculaAddStore";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "CurriculaAdd",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      v$: useVuelidate(),
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
  validations() {
    return {
      Curriculas: {
        title: { required },
        type: { required },
      },
    };
  },
  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    updateTypeId(selectedOption) {
      this.Curriculas.type = selectedOption ? selectedOption.id : null;
    },
    async submitForm() {
      try {
        const curriculaStore = useCurriculumAddStore();
        if (!curriculaStore) {
          throw new Error("Failed to load Curriculas store");
        }
        if (!this.Curriculas.title || !this.Curriculas.type) {
          return;
        }
        await curriculaStore.addCurriculasData(this.Curriculas);
        this.$router.push("/Curricula");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("errorrrrrr save");
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
</style>
