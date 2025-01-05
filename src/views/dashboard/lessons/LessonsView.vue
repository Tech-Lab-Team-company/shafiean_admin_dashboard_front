<template>
  <div class="">
    <div class="plus">
      <!-- <i class="fa-solid fa-pen-to-square"></i> -->
      <header-pages title="تفاصيل حصه" :showButton="false" />
    </div>
    <div class="lessons-view">
      <div class="row g-4">
        <div class="col-lg-6 col-md-6 col-12">
          <p>المرحلة</p>
          <span class="data">{{ Stages_values?.title }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>السور</p>
          <span class="data">
            {{ selectedType_values?.name }}
          </span>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <p>من الايه (يجب عليك اختيار السوره اولا)</p>
          <span class="data">{{ ayaType_values?.text }}</span>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <p>الى الايه (يجب عليك اختيار السوره اولا)</p>
          <span class="data">{{ ayaTypeto_values?.text }}</span>
        </div>

        <div class="col-lg-12 col-md-6 col-12">
          <div class="input">
            <p>الوصف</p>
            <span class="data">
              {{ lessons.title }}
            </span>
          </div>
        </div>
      </div>

      <div class="all-btn">
        <!-- <button type="submit" class="save" @click="Edit()">تعديل</button> -->
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useLessonsEditStore } from "@/stores/lessons/LessonsEditStore";

import { mapState } from "pinia";

export default {
  components: { HeaderPages },

  data() {
    return {
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

  methods: {
    async fetchData() {
      const store = useLessonsEditStore();
      const id = this.$route.params.id;
      await store.fetchLessons(id);

      this.lessons = store.lessons;

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

      //   this.lessonDescription = this.lessons.description;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.lessons-view {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
}
p {
  color: #000;
  font-weight: bold;
}

.data {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
}
</style>
