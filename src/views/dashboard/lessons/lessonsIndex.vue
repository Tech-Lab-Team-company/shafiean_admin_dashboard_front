<template>
  <div class="lessons">
    <header-pages title="الدروس" button="+ اضافة درس" link="/add-lessons" />
    <tables-page-vue
      :headers="tableHeaders"
      :rows="tableRowsLessons"
      :pages="tablePages"
      :showSelect="false"
      editLink="/edit-lessons"
      viewLink="/view-lessons"
      @delete="handleDeleteLessons"
    />
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useLessonsStore } from "@/stores/lessons/LessonsIndexStore";
import { mapState } from "pinia";
export default {
  name: "lessonsIndex",
  components: {
    HeaderPages,
    TablesPageVue,
  },
  data() {
    return {
      tableHeaders: [
        "ID",
        " وصف المنهج",
        " من ",
        " إلي",
        "رقم المرحله",
        "قران",
      ],
    };
  },
  computed: {
    ...mapState(useLessonsStore, {
      lessons: (state) => state.lessons,
    }),

    tableRowsLessons() {
      console.log(this.lessons, "Diiaaaa");
      return this.lessons.map((les) => [
        les.id,
        les.title,
        les.start_verse,
        les.end_verse,
        les.stage.id,
        les.quraan.id,
      ]);
    },
  },
  methods: {
    async handleDeleteLessons(id) {
      const lessonsStore = useLessonsStore();
      console.log(id);

      await lessonsStore.deletelessons(id);
    },
  },
  mounted() {
    const lessonsStore = useLessonsStore();
    lessonsStore.fetchLessons();
  },
};
</script>
