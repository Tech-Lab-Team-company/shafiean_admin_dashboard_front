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
    <PaginationPage
      :currentPage="paginationCurrent"
      :totalPages="paginationLast"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useLessonsStore } from "@/stores/lessons/LessonsIndexStore";
import { mapState } from "pinia";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
export default {
  name: "lessonsIndex",
  components: {
    HeaderPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
      tableHeaders: ["ID", " وصف المنهج", " من ", " إلي", " المرحله", "قران"],
    };
  },
  computed: {
    ...mapState(useLessonsStore, {
      lessons: (state) => state.lessons,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
    }),

    tableRowsLessons() {
      console.log(this.lessons, "Diiaaaa");
      return this.lessons.map((les) => [
        les.id,
        les.title,
        les.start_verse,
        les.end_verse,
        les.stage?.title || "",
        les.quraan?.title || "",
      ]);
    },
    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    handlePageChange(page) {
      const curriculaStore = useLessonsStore();
      curriculaStore.fetchLessons(page);
    },
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
