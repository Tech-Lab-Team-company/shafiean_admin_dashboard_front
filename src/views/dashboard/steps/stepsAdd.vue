<template>
  <div class="steps-add">
    <header-pages title="اضافة مرحلة" :showButton="false" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- Step Title Input -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="title">اسم المرحلة</label>
          <div class="input">
            <input
              id="title"
              type="text"
              placeholder="اسم المرحلة"
              v-model="steps.title"
              required
            />
            <span class="error-feedback" v-if="v$.steps.title.$error">{{
              v$.steps.title.$errors[0].$message
            }}</span>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="description">وصف المرحلة</label>
          <div class="input">
            <input
              id="description"
              type="text"
              placeholder="وصف المرحلة"
              v-model="steps.description"
              required
            />
            <span class="error-feedback" v-if="v$.steps.description.$error">{{
              v$.steps.description.$errors[0].$message
            }}</span>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="curricula">المنهج الدراسي</label>
          <multiselect
            id="curricula"
            v-model="curricula_values"
            :options="curriculaOptions"
            track-by="id"
            label="title"
            :close-on-select="false"
            @update:model-value="handleCurriculaChange"
            placeholder="اختر منهجاً دراسياً"
            required
          ></multiselect>
          <span class="error-feedback" v-if="v$.steps.curriculum_id.$error">{{
            v$.steps.curriculum_id.$errors[0].$message
          }}</span>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="disabilities">الإعاقات</label>
          <multiselect
            id="disabilities"
            v-model="disabilities_values"
            :options="disabilitiesOptions"
            track-by="id"
            label="title"
            :multiple="true"
            :close-on-select="false"
            @update:model-value="handleDisabilitiesChange"
            placeholder="اختر الإعاقات"
          />
          <span class="error-feedback" v-if="v$.steps.disability_ids.$error">{{
            v$.steps.disability_ids.$errors[0].$message
          }}</span>
        </div>

        <!-- Type Select -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="type">قرأن</label>
          <multiselect
            id="type"
            v-model="selectedType_values"
            :options="typeOptions"
            :close-on-select="true"
            label="name"
            track-by="id"
            @update:model-value="handleTypeChange"
            placeholder="اختر نوعاً"
          ></multiselect>
          <!-- <span class="error-feedback" v-if="v$.steps.type_id.$error">{{
            v$.steps.type_id.$errors[0].$message
          }}</span> -->
        </div>
      </div>

      <!-- Form Buttons -->
      <div class="all-btn">
        <button type="submit" class="save" @click="save()">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useStepsAddStore } from "@/stores/steps/StepsAddStore";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { mapState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "StepsAdd",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      v$: useVuelidate(),
      selectedType_values: [], // Initialize as an empty array for multiple selection
      curricula_values: null, // Initialize as null for single selection
      disabilities_values: [], // Initialize as an empty array for multiple selection
      typeOptions: [],
      curriculaOptions: [],
      disabilitiesOptions: [],
      steps: {
        title: "",
        description: "",
        type_id: "",
        curriculum_id: null, // Initialize as null for single selection
        disability_ids: [], // Initialize as an empty array
        typeOptions: [
          { id: 1, name: "قرأن" },
          { id: 2, name: "حديث" },
          { id: 3, name: "فقه" },
        ],
        selectedType: null,
      },
    };
  },
  validations() {
    return {
      steps: {
        title: { required },
        description: { required },
        curriculum_id: { required },
        disability_ids: { required },
        // type_id: { required },
      },
    };
  },

  async created() {
    await this.fetchData();
  },
  computed: {
    ...mapState(useStepsAddStore, ["Curriculums", "types", "disabilities"]),
  },
  methods: {
    handleTypeChange() {
      this.steps.type_id = this.selectedType_values
        ? this.selectedType_values.map((type) => type.id)
        : "";
    },
    handleCurriculaChange() {
      this.steps.curriculum_id = this.curricula_values
        ? this.curricula_values.id
        : null;
    },
    handleDisabilitiesChange() {
      if (Array.isArray(this.disabilities_values)) {
        this.steps.disability_ids = this.disabilities_values.map(
          (dis) => dis.id
        );
      } else {
        this.steps.disability_ids = [];
      }
    },

    async submitForm() {
      try {
        const stepsStore = useStepsAddStore();
        if (!stepsStore) {
          throw new Error("Failed to load steps store");
        }
        if (
          !this.steps.title ||
          !this.steps.description ||
          !this.steps.curriculum_id ||
          !this.steps.disability_ids
          // !this.steps.type_id
        ) {
          return;
        }
        await stepsStore.addStepsData(this.steps);
        this.$router.push("/steps");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    async fetchData() {
      try {
        const stepsStore = useStepsAddStore();
        await stepsStore.fetchCurriculums();
        this.curriculaOptions = stepsStore.Curriculums;
        await stepsStore.getDisabilities();
        this.disabilitiesOptions = stepsStore.disabilities;
      } catch (error) {
        console.error("Error fetching data:", error);
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
