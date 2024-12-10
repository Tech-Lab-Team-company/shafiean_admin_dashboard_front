<template>
  <div class="lessons-add">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="تعديل حصه" :showButton="false" />
    </div>
    <form @submit.prevent="updateLessons">
      <div class="row">
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
            label="name"
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
            label="text"
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
            label="text"
            track-by="id"
            placeholder="اختر الايه"
            :disabled="!ayaType_values"
            @change="handleEndAyaChange"
            @update:model-value="handleayaChange"
          ></multiselect>
       
        </div>

        <div class="col-lg-12 col-md-6 col-12">
          <div class="input">
            <label for=""> الوصف</label>
            <textarea
              id="description"
              name="w3review"
              rows="4"
              cols="100"
              placeholder="اسم الدرس"
              v-model="lessons.title"
            >
            </textarea>
          </div>
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
    surahOptions: [], // Make sure this is initialized as an empty array
    selectedType_values: null,
    ayaType_values: null,
    ayaTypeto_values: null,
    ayaOptions: [], // Initialize ayaOptions as empty
    filteredAyaOptions: [], // Initialize filteredAyaOptions as empty
    StagesOptions: [], // Initialize StagesOptions as empty
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
  },
  methods: {
    // getErrorMessage(field) {
    //   if (field.$invalid && field.$dirty) {
    //     return "هذا الحقل مطلوب";
    //   }
    //   return "";
    // },
    updateStagesValue() {
      this.lessons.stage_id = this.Stages_values ? this.Stages_values.id : null;
      console.log("Updated Stage ID:", this.lessons.stage_id);
    },
    updateTypeId(selectedOption) {
  this.lessons.surah_id = selectedOption ? selectedOption.id : null;
  console.log("surah_id:", this.lessons.surah_id); 
},
  async fetchData() {
  const store = useLessonsEditStore();
  const id = this.$route.params.id;
  await store.fetchLessons(id);
  
  this.lessons = store.lessons;

  await store.fetchSteps();
  await store.fetchSurahs();

  if (this.lessons.surah) {
    await store.fetchayah(this.lessons.surah);
  }

  this.StagesOptions = store.lesson; 
  this.surahOptions = store.surahs ;  
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
        name: this.lessons.surah.name,
      }
    : null;

  this.ayaType_values = this.lessons.start_ayah
    ? {
        id: this.lessons.start_ayah.id,
        text: this.lessons.start_ayah.text,
      }
    : null;

  this.ayaTypeto_values = this.lessons.end_ayah
    ? {
        id: this.lessons.end_ayah.id,
        text: this.lessons.end_ayah.text,
      }
    : null;

  
  this.lessonDescription = this.lessons.description; 
},

    async updateLessons() {
  console.log("stage_id", this.lessons.stage_id);



  const store = useLessonsEditStore();
  const id = this.$route.params.id;

  console.log("Payload being sent:", this.lessons); 

  try {
    await store.updateLessons(id, this.lessons); 
    Swal.fire("Success", "Lesson updated successfully", "success");
     
  } catch (error) {
    console.error("Error details:", error); 
    console.error("Response data:", error.response?.data); 
    Swal.fire(
      "Error",
      error.response?.data.message || "There was an issue updating the lesson. Please try again.",
      "error"
    );
  }
},
handleTypeChange() {
  this.lessons.surah = this.selectedType_values?.name || null;
  this.lessons.surah_id = this.selectedType_values?.id || null;  
  console.log("surah", this.lessons.surah);
  console.log("surah_id", this.lessons.surah_id); 
},
    handleayaChange() {
      this.lessons.start_ayah_id = this.ayaType_values?.id || null;
      this.lessons.end_ayah_id = this.ayaTypeto_values?.id || null;
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

  computed: {
  filteredAyaOptions() {
    if (this.selectedTypeto_values) {
      return this.ayaOptions.filter(ayah => ayah.surah_id === this.selectedType_values.id);
    }
    return this.ayaOptions; 
  }
}

};
</script>
<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
