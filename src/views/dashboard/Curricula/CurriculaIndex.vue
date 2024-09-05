<template>
  <div class="curricula">
    <header-pages title="المناهج" button="+ اضافة منهج" link="/add-curricula" />
    <tables-page-vue
      :headers="tableHeaders"
      :rows="tableRowsCurricula"
      :pages="tablePages"
      editLink="/edit-curricula"
      viewLink="/view-curricula"
    />
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useCurriculaStore } from "@/stores/curricula/curriculaStore";
import { mapState } from "pinia";
export default {
  components: { HeaderPages, TablesPageVue },
  data() {
    return {
      tableHeaders: ["ID", "الصور", "اسم المنهج", "وصف المنهج"],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    ...mapState(useCurriculaStore, {
      Curriculas: (state) => state.Curriculas,
      pages: (state) => state.pages,
    }),

    tableRowsCurricula() {
      return this.Curriculas.map((cur) => [
        cur.id,
        cur.title,
        cur.type,
        cur.status,
      ]);
    },
  },
  mounted() {
    const curriculaStore = useCurriculaStore();
    curriculaStore.fetchCurricula();
  },
};
</script>
