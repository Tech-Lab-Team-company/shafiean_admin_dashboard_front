<template>
  <div class="lessons-add">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="تعديل حلقه" :showButton="false" />
    </div>
    <form @submit.prevent="updateLessons">
      <div class="row">
        <div class="col-lg-12 col-md-6 col-12">
          <div class="input">
            <label for=""> اسم الحلقه</label>

            <input
              type="text"
              placeholder="اسم الحلقه"
              v-model="lessons.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Stages">المرحلة</label>
          <multiselect
            v-model="Stages_values"
            :options="StagesOptions"
            track-by="id"
            label="title"
            deselect-label=""
            select-label=""
            :close-on-select="true"
            @update:model-value="updateStagesValue"
          ></multiselect>
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
            label="title"
            track-by="id"
            placeholder="اختر السور"
            @update:model-value="handleTypeChange"
          ></multiselect>
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
            label="title"
            track-by="id"
            placeholder="اختر الايه"
            @change="handleStartAyaChange"
            @update:model-value="handleayaChange"
          ></multiselect>
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
            label="title"
            track-by="id"
            placeholder="اختر الايه"
            :disabled="!ayaType_values"
            @change="handleEndAyaChange"
            @update:model-value="handleayaChange"
          ></multiselect>
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
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useLessonsEditStore } from "@/stores/lessons/LessonsEditStore";
import { useLessonsAddStore } from "@/stores/lessons/LessonsAddStore";
import "vue-multiselect/dist/vue-multiselect.css";
import Multiselect from "vue-multiselect";
import { mapState } from "pinia";
import Swal from "sweetalert2";

import useVuelidate from "@vuelidate/core";

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
        surah: "",
      },
      surahOptions: [],
      selectedType_values: null,
      ayaType_values: null,
      ayaTypeto_values: null,
      ayaOptions: [],
      filteredAyaOptions: [],
      StagesOptions: [],
      Stages_values: {},
    };
  },
  // validations() {
  //   return {
  //     lessons: {
  //       title: { required },
  //       start_ayah_id: { required },
  //       end_ayah_id: { required },
  //       stage_id: { required },
  //       surah: { required },
  //     },
  //   };
  // },
  computed: {
    ...mapState(useLessonsEditStore, {
      lessons: (state) => state.lessons,
    }),
    filteredAyaOptions() {
      // Filter out the selected ayaType_values from the options for "الى الايه"
      return this.ayaOptions.filter(
        (option) => option.id !== this.ayaType_values?.id
      );
    },
  },
  methods: {
    // getErrorMessage(field) {
    //   if (field.$invalid && field.$dirty) {
    //     return "هذا الحقل مطلوب";
    //   }
    //   return "";
    // },
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
    handleEndAyaChange() {
      // تحديث الحقل end_ayah_id
      this.lessons.end_ayah_id = this.ayaTypeto_values?.id || null;
    },
    handleStartAyaChange() {
      // تحديث الحقل start_ayah_id
      this.lessons.start_ayah_id = this.ayaType_values?.id || null;

      // تفعيل القائمة الثانية عند اختيار من الآية
      if (this.ayaType_values) {
        this.disableAyaToOptions = false;
      }
    },
    updateStagesValue() {
      this.lessons.stage_id = this.Stages_values ? this.Stages_values.id : null;
      this.handelss();
      console.log("Updated Stage ID:", this.lessons.stage_id);
    },
    updateTypeId(selectedOption) {
      this.lessons.surah_id = selectedOption ? selectedOption.id : null;
      console.log("surah_id:", this.lessons.surah_id);
    },
    async handelss() {
      const store = useLessonsEditStore();
      await store.fetchSurahs(this.Stages_values.id);
      this.surahOptions = store.surahs;
    },
    async fetchData() {
      const store = useLessonsEditStore();
      const id = this.$route.params.id;
      await store.fetchLessons(id);

      this.lessons = store.lessons;

      await store.fetchSteps();

      if (this.lessons.surah) {
        await store.fetchayah(this.lessons.surah);
      }

      this.StagesOptions = store.lesson;

      this.ayaOptions = store.ayahs;

      console.log(this.lessons, "Lesson data:");

      this.Stages_values = this.lessons.stage
        ? {
            id: this.lessons.stage.id,
            title: this.lessons.stage.title,
          }
        : null;
      this.selectedType_values = this.lessons.surah
        ? {
            id: this.lessons.surah.id,
            title: this.lessons.surah.title,
          }
        : null;

      this.ayaType_values = this.lessons.start_ayah
        ? {
            id: this.lessons.start_ayah.id,
            title: this.lessons.start_ayah.title,
          }
        : null;

      this.ayaTypeto_values = this.lessons.end_ayah
        ? {
            id: this.lessons.end_ayah.id,
            title: this.lessons.end_ayah.title,
          }
        : null;

      this.lessonDescription = this.lessons.description;
    },

    async updateLessons() {
      const updatedData = {
        title: this.lessons.title,
        stage_id: this.Stages_values ? this.Stages_values.id : null,
        surah_id: this.selectedType_values ? this.selectedType_values.id : null,
        start_ayah_id: this.ayaType_values ? this.ayaType_values.id : null,
        end_ayah_id: this.ayaTypeto_values ? this.ayaTypeto_values.id : null,
      };

      console.log("Updated data for lesson:", updatedData);

      const store = useLessonsEditStore();
      const id = this.$route.params.id;

      if (!this.v$.$error) {
        try {
          await store.updateLessons(id, updatedData);
          // Swal.fire("Success", "Lesson updated successfully", "success");
        } catch (error) {
          console.error("Error details:", error);
          // Swal.fire(
          //   "Error",
          //   error.response?.data.message || "Error occurred while updating lesson.",
          //   "error"
          // );
        }
      } else {
        // Swal.fire("Error", "Please correct the errors before submitting.", "error");
      }
    },

    handleTypeChange() {
      this.lessons.surah_id = this.selectedType_values?.id || null;
      this.fetchAYA();
    },
    handleayaChange() {
      this.lessons.start_ayah_id = this.ayaType_values?.id;
      this.lessons.end_ayah_id = this.ayaTypeto_values?.id;
    },
    Edit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("lessons");
        this.updateLessons();
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
