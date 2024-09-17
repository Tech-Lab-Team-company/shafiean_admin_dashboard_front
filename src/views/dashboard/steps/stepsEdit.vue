<template>
  <div class="steps-add">
    <header-pages title="اضافة مرحلة" :showButton="false" />
    <form @submit.prevent="updateSteps">
      <div class="row">
        <!-- Step Title Input -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم المرحلة</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المرحلة"
              v-model="Steps.title"
            />
            <span class="error-feedback" v-if="v$.Steps.title.$error">{{
              getErrorMessage(v$.Steps.title)
            }}</span>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المرحلة</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المرحلة"
              v-model="Steps.description"
            />
            <span class="error-feedback" v-if="v$.Steps.description.$error">{{
              getErrorMessage(v$.Steps.description)
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
          <span class="error-feedback" v-if="v$.Steps.curriculum_id.$error">{{
            getErrorMessage(v$.Steps.curriculum_id)
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

          <span class="error-feedback" v-if="v$.disability_ids.$error">{{
            getErrorMessage(v$.disability_ids)
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
        </div>
      </div>

      <!-- Form Buttons -->
      <div class="all-btn">
        <button type="submit" class="save" @click="Edit()">تعديل</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useStepsEditStore } from "@/stores/steps/StepsEditStore";
import { mapState } from "pinia";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  components: { HeaderPages, Multiselect },
  data() {
    return {
      v$: useVuelidate(),
      selectedType_values: [], // Initialize as an empty array for multiple selection
      curricula_values: null, // Initialize as null for single selection
      disabilities_values: [], // Initialize as an empty array for multiple selection
      typeOptions: [],
      curriculaOptions: [],
      disabilitiesOptions: [],
      Steps: {
        title: "",
        description: "",
        curriculum: {},
        type_id: "",
        curriculum_id: null, // Initialize as null for single selection
        disability_ids: "", // Initialize as an empty array
      },
    };
  },
  validations() {
    return {
      Steps: {
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
    ...mapState(useStepsEditStore, ["Curriculums", "types", "disabilities"]),
  },
  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    handleTypeChange() {
      this.Steps.type_id = this.selectedType_values.map((type) => type.id);
    },
    handleCurriculaChange() {
      this.Steps.curriculum_id = this.curricula_values
        ? this.curricula_values.id
        : null;
    },
    handleDisabilitiesChange() {
      console.log("disabilities_values", this.disabilities_values);
      console.log("steps", this.Steps);

      if (Array.isArray(this.disabilities_values)) {
        this.Steps.disability_ids = this.disabilities_values.map(
          (dis) => dis.id
        );
      } else {
        this.Steps.disability_ids = "";
      }
    },
    async fetchData() {
      const store = useStepsEditStore();
      const id = this.$route.params.id;

      await store.fetchSteps(id);
      this.Steps = store.Steps;

      // Set curricula_values
      this.curricula_values = this.Steps.curriculum
        ? { id: this.Steps.curriculum.id, title: this.Steps.curriculum.title }
        : null;

      // Set disabilities_values with proper structure
      this.disabilities_values = this.Steps.disability.map((dis) => ({
        id: dis.id,
        title: dis.title,
      }));

      console.log("curricula_values", this.curricula_values);
      console.log("disabilities_values", this.disabilities_values);

      // Fetch options for multiselect components
      await store.fetchCurriculums();
      this.curriculaOptions = store.Curriculums;

      await store.getDisabilities();
      this.disabilitiesOptions = store.disabilities;
    },
    async updateSteps() {
      const store = useStepsEditStore();
      const id = this.$route.params.id;
      await store.updateSteps(id, this.Steps);
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
    // v-model multi select
  },
};
</script>
