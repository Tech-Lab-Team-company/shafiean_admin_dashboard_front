<template>
  <div class="lessons-add">
    <div class="plus">
      <i class="fa-solid fa-plus"></i>
      <header-pages title="اضافة حصه" :showButton="false" />
    </div>
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- Multiselect for Stages -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Stages">المرحلة</label>
          <multiselect
            v-model="Stages_values"
            :options="StagesOptions"
            track-by="id"
            label="title"
            placeholder="اختر المرحلة"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            @update:model-value="updateStagesValue"
          ></multiselect>
          <span class="error-feedback" v-if="v$.lessons.stage_id.$error">
            {{ getErrorMessage(v$.lessons.stage_id) }}
          </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="type">السور</label>
          <multiselect
            id="type"
            v-model="selectedType_values"
            :options="surahOptions"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            label="name"
            track-by="id"
            placeholder="اختر السور"
            @change="fetchsurahs"
            @update:model-value="handleTypeChange"
          ></multiselect>
          <span class="error-feedback" v-if="v$.lessons.surah_id.$error">
            {{ getErrorMessage(v$.lessons.surah_id) }}
          </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="type"> من الايه (يجب عليك اختيار السوره اولا)</label>
          <multiselect
            id="type"
            v-model="ayaType_values"
            :options="ayaOptions"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            label="text"
            track-by="id"
            placeholder="اختر السور"
            @change="handleStartAyaChange"
            @update:model-value="handleayaChange"
          ></multiselect>
          <span class="error-feedback" v-if="v$.lessons.start_ayah_id.$error">
            {{ getErrorMessage(v$.lessons.start_ayah_id) }}
          </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="type"> الى الايه (يجب عليك اختيار السوره اولا)</label>
          <multiselect
            id="type"
            v-model="ayaTypeto_values"
            :options="filteredAyaOptions"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            label="text"
            track-by="id"
            placeholder="اختر السور"
            :disabled="!ayaType_values"
            @change="handleEndAyaChange"
            @update:model-value="handleayaChange"
          ></multiselect>
          <span class="error-feedback" v-if="v$.lessons.start_ayah_id.$error">
            {{ getErrorMessage(v$.lessons.start_ayah_id) }}
          </span>
        </div>
        <div class="col-lg-12 col-md-6 col-12">
          <label for="" class="mt-3"> وصف المنهج</label>
          <div class="input">
            <textarea
              id="description"
              name="w3review"
              rows="4"
              cols="100"
              placeholder="اسم الدرس"
              v-model="lessons.title"
            ></textarea>
            <span class="error-feedback" v-if="v$.lessons.title.$error">
              {{ getErrorMessage(v$.lessons.title) }}
            </span>
          </div>
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
import { useLessonsAddStore } from "@/stores/lessons/LessonsAddStore";
import "vue-multiselect/dist/vue-multiselect.css";
import Multiselect from "vue-multiselect";
import { mapState } from "pinia";
import Swal from "sweetalert2";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { HeaderPages, Multiselect },

  data() {
    return {
      v$: useVuelidate(),
      lessons: {
        title: "",
        start_ayah_id: "",
        end_ayah_id: "",
        stage_id: "",
        surah_id: "",
      },
      surahOptions: [],
      selectedType_values: null,
      ayaType_values: null,
      ayaTypeto_values: null,
      ayaOptions: [],
      StagesOptions: [],
      Stages_values: {},
    };
  },
  validations() {
    return {
      lessons: {
        title: { required },
        surah_id: { required },
        stage_id: { required },
        start_ayah_id: { required },
      },
    };
  },

  computed: {
    ...mapState(useLessonsAddStore, {
      lesson: (state) => state.lesson,
    }),
    filteredAyaOptions() {
      // Filter out the selected ayaType_values from the options for "الى الايه"
      return this.ayaOptions.filter(
        (option) => option.id !== this.ayaType_values?.id
      );
    },
  },

  methods: {
    handleStartAyaChange() {
      // تحديث الحقل start_ayah_id
      this.lessons.start_ayah_id = this.ayaType_values?.id || null;

      // تفعيل القائمة الثانية عند اختيار من الآية
      if (this.ayaType_values) {
        this.disableAyaToOptions = false;
      }
    },
    handleEndAyaChange() {
      // تحديث الحقل end_ayah_id
      this.lessons.end_ayah_id = this.ayaTypeto_values?.id || null;
    },
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    async fetchStages() {
      try {
        const LessonsStore = useLessonsAddStore();
        if (!LessonsStore) {
          throw new Error("Failed to load Lessons store");
        }
        await LessonsStore.fetchSteps();
        this.StagesOptions = LessonsStore.lesson;
      } catch (error) {
        console.error("Error fetching stages", error);
      }
    },
    async fetchsurahs() {
      try {
        const LessonsStore = useLessonsAddStore();
        if (!LessonsStore) {
          throw new Error("Failed to load Lessons store");
        }
        await LessonsStore.fetchSurahs(this.Stages_values.id);
        this.surahOptions = LessonsStore.surahs;
      } catch (error) {
        console.error("Error fetching surahs", error);
      }
    },
    // تعديل fetchAYA لجلب الآيات بناءً على السورة
    async fetchAYA() {
      if (!this.selectedType_values) {
        Swal.fire("خطأ", "يجب اختيار سورة أولًا.", "error");
        return;
      }

      try {
        const LessonsStore = useLessonsAddStore();
        if (!LessonsStore) {
          throw new Error("Failed to load Lessons store");
        }

        // جلب الآيات بناءً على السورة المحددة
        await LessonsStore.fetchayah(this.selectedType_values.id); // تمرير السورة المحددة
        this.ayaOptions = LessonsStore.ayahs;
      } catch (error) {
        console.error("Error fetching aya", error);
        Swal.fire("خطأ", "حدث خطأ أثناء جلب الآيات.", "error");
      }
    },
    async submitForm() {
      try {
        if (!this.v$.$validate()) {
          Swal.fire("Error", "Please fill in all required fields", "error");
          return;
        }

        const lessonsStore = useLessonsAddStore();
        await lessonsStore.addLessonsData(this.lessons);
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },

    updateStagesValue() {
      this.lessons.stage_id = this.Stages_values ? this.Stages_values.id : null;
      this.fetchsurahs();
      console.log("Stages_id", this.lessons.stage_id);
    },
    handleTypeChange() {
      this.lessons.surah_id = this.selectedType_values?.id || null;
      this.fetchAYA();
    },
    handleayaChange() {
      this.lessons.start_ayah_id = this.ayaType_values?.id || null;
      this.lessons.end_ayah_id = this.ayaTypeto_values?.id || null;
    },

    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("lessons", this.lessons);
      }
    },
  },

  mounted() {
    this.fetchStages();
    // this.fetchsurahs();
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
