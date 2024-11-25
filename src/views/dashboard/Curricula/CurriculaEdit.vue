<template>
  <div class="plus">
    <i class="fa-solid fa-pen-to-square"></i>
    <header-pages title="تعديل منهج" :showButton="false" />
  </div>
  <div class="edit-curricula">
    <form action="" @submit.prevent="updateCurricula">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم المنهج</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المنهج"
              v-model="Curriculas.title"
            />
            <span class="error-feedback" v-if="v$.Curriculas.title.$error">
              {{ getErrorMessage(v$.Curriculas.title) }}
            </span>
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
            placeholder="اختر نوع المنهج"
            @update:model-value="updateTypeId"
          ></multiselect>
          <span class="error-feedback" v-if="v$.Curriculas.type.$error">
            {{ getErrorMessage(v$.Curriculas.type) }}
          </span>
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
import Swal from "sweetalert2";

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
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    getType(selectedOption) {
      if (selectedOption === 1) {
        return {
          id: 1,
          name: "قرأن",
        };
      } else if (selectedOption === 2) {
        return {
          id: 2,
          name: "حديث",
        };
      } else if (selectedOption === 3) {
        return {
          id: 3,
          name: "فقه",
        };
      }
    },
    updateTypeId(selectedOption) {
      this.Curriculas.type = selectedOption ? selectedOption.id : null;
    },
    async fetchData() {
      try {
        const store = useCurriculumEditStore();
        const id = this.$route.params.id;
        await store.fetchCurricula(id);

        // Ensure Curriculas is always an object
        this.Curriculas = store.Curriculas || { title: "", type: null };
      } catch (error) {
        console.error("Failed to fetch data:", error);
        Swal.fire("Error", "Failed to load data", "error");
      }
    },
    async updateCurricula() {
      const store = useCurriculumEditStore();
      const id = this.$route.params.id;

      if (!this.Curriculas.title || !this.Curriculas.type) {
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      }

      try {
        await store.updateCurriculum(id, {
          title: this.Curriculas.title,
          type: this.Curriculas.type,
        });
        this.$router.go(-1);
      } catch (error) {
        console.error("Failed to update curriculum:", error);
        Swal.fire("Error", "Failed to update curriculum", "error");
      }
    },
    Edit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Error: Validation failed");
      }
    },
  },
  async mounted() {
    await this.fetchData();
    // console.log("Curriculas:", this.Curriculas);
    // Ensure type is always an object
    if (this.Curriculas.type) {
      this.selectedType = this.getType(this.Curriculas.type);
    }
    this.getType(this.Curriculas.type);
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
