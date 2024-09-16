<template>
  <header-pages title="تعديل منهج" :showButton="false" />
  <div class="edit-curricula">
    <form action="" @submit.prevent="updateCurricula">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المنهج</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المنهج"
              v-model="Curriculas.title"
            />
            <span class="error-feedback" v-if="v$.Curriculas.title.$error">{{
              v$.Curriculas.title.$errors[0].$message
            }}</span>
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
          <span class="error-feedback" v-if="v$.Curriculas.type.$error">
            {{ v$.Curriculas.type.$errors[0].$message }}</span
          >
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save" @click="Edit()">تعديل</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useCurriculumEditStore } from "@/stores/curricula/curriculaEditStore";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "CurriculaEdit",
  components: {
    headerPages,
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
    updateTypeId(selectedOption) {
      this.Curriculas.type = selectedOption ? selectedOption.id : null;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async fetchData() {
      const store = useCurriculumEditStore();
      const id = this.$route.params.id;

      await store.fetchCurricula(id);
      this.Curriculas = store.Curriculas;
    },
    async updateCurricula() {
      const store = useCurriculumEditStore();
      const id = this.$route.params.id;
      await store.updateCurriculum(id, {
        title: this.Curriculas.title,
        type: this.Curriculas.type,
        status: this.Curriculas.status,
      });
      if (!this.Curriculas.title || !this.Curriculas.type) {
        return;
      }
      this.$router.go(-1);
    },
    Edit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("errorrrrrr save");
      }
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
