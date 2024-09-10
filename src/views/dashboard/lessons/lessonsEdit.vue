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
              placeholder=" وصف المرحلة  "
              v-model="lessons.start_verse"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> إلي</label>
          <div class="input">
            <input type="date" placeholder="قران" v-model="lessons.end_verse" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> الاعاقه</label>
          <div class="input">
            <input
              type="number"
              placeholder="الاعاقه"
              v-model="lessons.stage_id"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> المنهج الدراسي</label>
          <div class="input">
            <input
              type="number"
              placeholder="المنهج الدراس"
              v-model="lessons.quraan_id"
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
import { useLessonsEditStore } from "@/stores/lessons/LessonsEditStore";
export default {
  components: { HeaderPages },
  data() {
    return {
      lessons: [],
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async fetchData() {
      const store = useLessonsEditStore();
      const id = this.$route.params.id;

      await store.fetchLessons(id);
      this.lessons = store.lessons;
    },
    async submitForm() {
      const store = useLessonsEditStore();
      const id = this.$route.params.id;
      await store.updateLessons(id, {
        title: this.lessons.title,
      });
      this.$router.go(-1);
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
