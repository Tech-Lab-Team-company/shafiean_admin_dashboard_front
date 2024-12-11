<template>
  <div class="steps-add mt-1">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="تعديل مرحلة" :showButton="false" />
    </div>
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

        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="curricula">المنهج الدراسي</label>
          <multiselect
            id="curricula"
            v-model="curricula_values"
            :options="curriculaOptions"
            track-by="id"
            label="title"
            deselect-label=""
            select-label=""
            :close-on-select="true"
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
            deselect-label=""
            select-label=""
            :close-on-select="true"
            placeholder="اختر الإعاقات"
          />

          <span class="error-feedback" v-if="v$.Steps.disability_ids.$error">{{
            getErrorMessage(v$.Steps.disability_ids)
          }}</span>
        </div>

        <!-- Type Select -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="type">قرأن</label>
          <multiselect
            id="type"
            v-model="selectedType_values"
            :options="surahOptions"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            label="name"
            track-by="id"
            @update:model-value="handleTypeChange"
            placeholder="اختر نوعاً"
          ></multiselect>
        </div>
        <div class="col-lg-12 col-md-6 col-12 mt-3">
          <label for="description">وصف المرحلة</label>
          <div class="input">
            <textarea
              id="description"
              name="w3review"
              rows="4"
              placeholder="وصف المرحلة"
              v-model="Steps.description"
              required
            >
            </textarea>
          </div>
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
      selectedType_values: [],
      curricula_values: null,
      disabilities_values: [],
      typeOptions: [],
      curriculaOptions: [],
      disability_ids: [],
      disabilitiesOptions: [],
      surahOptions: [],
      Steps: {
        title: "",
        description: "",
        curriculum: {},
        surahs: [],
        type_id: "",
        curriculum_id: null,
        disability_ids: "",
        surah_ids: null,
      },
    };
  },
  validations() {
    return {
      Steps: {
        title: { required },
        // description: { required },
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
      if (Array.isArray(this.selectedType_values)) {
        this.Steps.type_id = this.selectedType_values.map((type) => type.id);
      } else {
        this.Steps.type_id = [];
      }
    },
    handleCurriculaChange() {
      this.Steps.curriculum_id = this.curricula_values
        ? this.curricula_values.id
        : null;
    },
    // handleDisabilitiesChange() {
    //   // console.log("disabilities_values", this.disabilities_values);
    //   // console.log("steps", this.Steps);
    //
    //   if (Array.isArray(this.disabilities_values)) {
    //     this.Steps.disability_ids = this.disabilities_values.map(
    //       (dis) => dis.id
    //     );
    //   } else {
    //     this.Steps.disability_ids = "";
    //   }
    // },
    async fetchData() {
      const store = useStepsEditStore();
      const id = this.$route.params.id;

      await store.fetchSteps(id);
      this.Steps = store.Steps;

      await store.fetchSurah();
      this.surahOptions = store.surahs;
      this.selectedType_values = this.Steps.surahs.map((surah) => ({
        id: surah.id,
        name: surah.name,
      }));

      this.curricula_values = this.Steps.curriculum
        ? { id: this.Steps.curriculum.id, title: this.Steps.curriculum.title }
        : null;

      this.disabilities_values = this.Steps.disability.map((dis) => ({
        id: dis.id,
        title: dis.title,
      }));

      await store.fetchCurriculums();
      this.curriculaOptions = store.Curriculums;

      await store.getDisabilities();
      this.disabilitiesOptions = store.disabilities;
    },
    async updateSteps() {
      const store = useStepsEditStore();
      const id = this.$route.params.id;

      this.Steps.curriculum_id = this.curricula_values?.id || null;

      this.Steps.surah_ids =
        this.selectedType_values.length > 0
          ? [this.selectedType_values[0].id]
          : [];

      this.Steps.disability_ids = Array.isArray(this.disabilities_values)
        ? this.disabilities_values.map((dis) => dis.id) // أخذ IDs فقط
        : [];

      console.log("Prepared Steps Data:", JSON.stringify(this.Steps, null, 2));

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
  },
};
</script>
