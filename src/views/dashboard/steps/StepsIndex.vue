<template>
  <div class="Steps">
    <header-pages title="المراحل" button="+ اضافة مرحلة" link="/add-steps" />

    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsSteps"
      :showSelect="false"
      :pages="tablePages"
      editLink="/edit-steps"
      viewLink="/view-steps"
      @delete="handleDeleteSteps"
    />
    <PaginationPage
      :currentPage="paginationCurrent"
      :totalPages="paginationLast"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import TablesPageVue from "@/components/tables/TablesPage.vue";
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useStepsStore } from "@/stores/steps/StepsStore";
import { mapState } from "pinia";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
export default {
  components: { HeaderPages, TablesPageVue, PaginationPage },
  data() {
    return {
      tableHeaders: ["ID", "اسم المرحله", "وصف المرحله", "  المنهج الدراسي   "],
    };
  },

  computed: {
    ...mapState(useStepsStore, {
      steps: (state) => state.steps,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
    }),
    tableRowsSteps() {
      console.log(this.steps, "Diiaaaa");

      return this.steps.map((st) => [
        st.id,
        st.title,
        st.description,
        st.curriculum?.title || "",
      ]);
    },
    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    handlePageChange(page) {
      const stepsStore = useStepsStore();
      stepsStore.getSteps(page);
    },
    async handleDeleteSteps(id) {
      const stepsStore = useStepsStore();
      console.log(id);
      await stepsStore.deleteSteps(id);
    },
  },
  mounted() {
    const stepsStore = useStepsStore();
    stepsStore.getSteps();
  },
};
</script>
