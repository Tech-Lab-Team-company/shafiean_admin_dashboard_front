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
          <label for=""> من </label>
          <div class="input">
            <input
              type="date"
              placeholder=" من   "
              v-model="lessons.start_verse"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> إلي</label>
          <div class="input">
            <input type="date" placeholder="إلي" v-model="lessons.end_verse" />
          </div>
        </div>
        <!-- selected -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> المرحلة</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم المرحله"
              v-model="lessons.stage.id"
            />
            <!-- selected -->
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> قران</label>
          <div class="input">
            <input
              type="number"
              placeholder="المنهج الدراس"
              v-model="lessons.quraan.id"
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
import Swal from "sweetalert2";
export default {
  components: { HeaderPages },
  data() {
    return {
      lessons: {
        title: "",
        start_verse: "",
        end_verse: "",
        stage: { id: null },
        quraan: { id: null },
      },
    };
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
          !this.lessons.start_verse ||
          !this.lessons.end_verse ||
          !this.lessons.stage.id ||
          !this.lessons.quraan.id
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
};
</script>
