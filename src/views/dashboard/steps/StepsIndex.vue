<template>
  <div class="Steps">
    <header-pages title="المراحل" button="+ اضافة مرحلة" link="/add-steps" />

    <div class="alll">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="بحث عن أسم مرحلة..."
          v-model="word"
          @input="debouncedSearch"
        />
      </div>
      <TablesPageVue
        :headers="tableHeaders"
        :rows="tableRowsSteps"
        :showSelect="false"
        :pages="tablePages"
        editLink="/edit-steps"
        viewLink="/view-steps"
        @delete="handleDeleteSteps"
      />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <PaginationPage
        :currentPage="paginationCurrent"
        :totalPages="paginationLast"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import TablesPageVue from "@/components/tables/TablesPage.vue";
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useStepsStore } from "@/stores/steps/StepsStore";
import { mapState } from "pinia";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { debounce } from "lodash"; // استيراد دالة debounce

export default {
  components: { HeaderPages, TablesPageVue, PaginationPage },
  data() {
    return {
      word: "",
      debouncedSearch: null,
      errorMessage: "",
      tableHeaders: ["ID", "اسم المرحله", "وصف المرحله", "  المنهج الدراسي   " , "السوره"],
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
      // console.log(this.steps, "Diiaaaa");
      const dataToDisplay = this.steps;
      return dataToDisplay.map((st) => [
        st.id,
        st.title,
        st.description,
        st.curriculum?.title || "",
        st.surahs.map(surah => surah.name).join(', ')
      ]);
    },
    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    handleInputChange() {
      this.errorMessage = "";
      this.debouncedSearch();
    },
    async handleSearch() {
      const stepsStore = useStepsStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await stepsStore.getSteps(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await stepsStore.getSteps(1, this.word);

      if (stepsStore.steps.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
    },

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
    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
