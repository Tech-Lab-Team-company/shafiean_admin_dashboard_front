<template>
  <div class="lessons-add">
    <header-pages title="اضافة درس" :showButton="false" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> الوصف</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم الدرس"
              v-model="lessons.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> وصف المرحلة </label>
          <div class="input">
            <input
              type="text"
              placeholder=" وصف المرحلة  "
              v-model="lessons.description"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> قران</label>
          <div class="input">
            <input
              type="number"
              placeholder="قران"
              v-model="lessons.quraan_ids"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> الاعاقه</label>
          <div class="input">
            <input
              type="number"
              placeholder="الاعاقه"
              v-model="lessons.disability_ids"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> المنهج الدراسي</label>
          <div class="input">
            <input
              type="number"
              placeholder="المنهج الدراس"
              v-model="lessons.curriculum_id"
            />
          </div>
        </div>
      </div>

      <div class="all-btn">
        <button type="submit" class="save">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useLessonsAddStore } from "@/stores/lessons/LessonsAddStore";
import { mapState } from "pinia";
import Swal from "sweetalert2";
export default {
  components: { HeaderPages },
  data() {
    return {
      lessons: {
        title: "",
        description: "",
        curriculum_id: [],
        disability_ids: "",
        quraan_ids: "",
      },
    };
  },
  computed: {
    ...mapState(useLessonsAddStore, {
      Curriculum_id: (state) => state.Curriculum_id,
    }),
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async submitForm() {
      try {
        const LessonsIndexStore = useLessonsAddStore();
        if (!LessonsIndexStore) {
          throw new Error("Failed to load Lessons store");
        }

        if (
          !this.lessons.title ||
          !this.lessons.curriculum_id ||
          !this.lessons.quraan_ids ||
          !this.lessons.disability_ids ||
          !this.lessons.description
        ) {
          Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await LessonsIndexStore.addLessonsData(this.lessons);
        this.$router.push("/lessons");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
  },
  mounted() {
    const LessonsIndexStore = useLessonsAddStore();
    LessonsIndexStore.getcurriculum();
    console.log(this.Curriculum_id, "nasra");
  },
};
</script>
