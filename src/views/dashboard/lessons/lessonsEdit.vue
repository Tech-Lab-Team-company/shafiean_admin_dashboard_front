<template>
  <div class="lessons-add">
    <header-pages title="تعديل درس" :showButton="false" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> اسم الدرس</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم الدرس"
              v-model="lessons.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> من </label>
          <div class="input">
            <input
              type="date"
              placeholder="وصف المرحلة"
              v-model="lessons.start_verse"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> إلي</label>
          <div class="input">
            <input type="date" placeholder="قرأن" v-model="lessons.end_verse" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Stages">المرحلة</label>
          <multiselect
            v-model="Stages_values"
            :options="StagesOptions"
            track-by="id"
            label="title"
            :close-on-select="false"
            @update:model-value="updateStagesValue"
          ></multiselect>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="">القرأن</label>
          <multiselect
            id="type"
            v-model="selectedType"
            :options="typeOptions"
            :close-on-select="true"
            label="name"
            track-by="id"
            @update:model-value="updateTypeId"
          ></multiselect>
        </div>
      </div>

      <div class="all-btn">
        <button type="submit" class="save">تعديل</button>
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

export default {
  components: { HeaderPages, Multiselect },
  data() {
    return {
      lessons: {
        title: "",
        start_verse: "",
        end_verse: "",
        stage_id: "",
        quraan_id: "",
      },
      StagesOptions: [],
      Stages_values: {},
      typeOptions: [
        { id: 1, name: "قرأن" },
        { id: 2, name: "حديث" },
        { id: 3, name: "فقه" },
      ],
      selectedType: null,
    };
  },
  computed: {
    ...mapState(useLessonsEditStore, {
      lessons: (state) => state.lessons,
    }),
  },
  methods: {
    updateStagesValue() {
      this.lessons.stage_id = this.Stages_values ? this.Stages_values.id : null;
      console.log("Updated Stage ID:", this.lessons.stage_id);
    },
    updateTypeId(selectedOption) {
      this.lessons.quraan_id = selectedOption ? selectedOption.id : null;
    },
    async fetchData() {
      const store = useLessonsEditStore();
      const id = this.$route.params.id;
      await store.fetchLessons(id);
      await store.fetchSteps();
      this.StagesOptions = store.lesson; // Assuming this is correct
      this.lessons = store.lessons;
      console.log(
        this.lessons.stage.title,
        "this.lessonssssssssssssssssssssssss"
      );
      this.Stages_values = this.lessons.stage
        ? {
            id: this.lessons.stage.id,
            title: this.lessons.stage.title,
          }
        : null;
    },
    async submitForm() {
      const store = useLessonsEditStore();
      const id = this.$route.params.id;
      await store.updateLessons(id, this.lessons);
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
