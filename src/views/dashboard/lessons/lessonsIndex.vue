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
        "الوصف",
        " وصف المنهج",
        " المنهج الدراسي",
        " قران",
        "الاعاقه",
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
        les.description,
        les.curriculum_id,
        les.quraan_ids,
        les.disability_ids,
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
