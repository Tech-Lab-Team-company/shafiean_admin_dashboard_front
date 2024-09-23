<template>
  <div class="classes">
    <header-pages
      title=" الفصول الدراسية"
      button="+ اضافة فصل دراسي"
      link="/add-classes"
    />

    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsClasses"
      :pages="tablePages"
      editLink="/edit-classes"
      viewLink="/view-classes"
      @delete="handleDeleteClasses"
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
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useClassesStore } from "@/stores/Classess/ClassesStore";
import { mapState } from "pinia";

export default {
  components: {
    HeaderPages,
    TablesPageVue,
    PaginationPage,
  },

  data() {
    return {
      tableHeaders: ["ID", "اسم الفصول الدراسية", "المدينه"],
    };
  },

  computed: {
    ...mapState(useClassesStore, {
      Classes: (state) => state.Classes,
    }),
    ...mapState(usePaginationStore, {
      paginationCurrent: (state) => state.current_page,
      paginationFrom: (state) => state.from,
      paginationLast: (state) => state.last_page,
      paginationPer: (state) => state.per_page,
      paginationTo: (state) => state.to,
      paginationTotal: (state) => state.total,
    }),
    tableRowsClasses() {
      return this.Classes.map((cl) => [cl.id, cl.title, cl.country.title]);
    },
    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },

  methods: {
    handlePageChange(page) {
      const useClasses = useClassesStore();
      useClasses.getClasses(page);
    },
    handleDeleteClasses(id) {
      const ClassesStore = useClassesStore();
      console.log(id);
      ClassesStore.deleteClasses(id);
    },
  },
  async mounted() {
    const ClassesStore = useClassesStore();
    await ClassesStore.getClasses();
  },
};
</script>
