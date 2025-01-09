<template>
  <div class="lessons">
    <header-pages
      title="انواع الحلقات"
      button="+ اضافة 
      نوع الحلقه"
      link="/add-type-lesson"
    />
    <div class="alll">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="بحث عن نوع الحلقه..."
          v-model="word"
          @input="debouncedSearch"
        />
      </div>
      <tables-page-vue
        :headers="tableHeaders"
        :rows="tableRowsLessons"
        :pages="tablePages"
        :showSelect="false"
        editLink="/edit-type-lesson"
        viewLink="/view-type-lesson"
        @delete="handleDeleteLessons"
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
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useTypeLessonsStore } from "@/stores/typelesson/TypeLessonsIndexStore";
import { mapState } from "pinia";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { debounce } from "lodash"; // استيراد دالة debounce

export default {
  name: "lessonsIndex",
  components: {
    HeaderPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
      word: "",
      errorMessage: "",
      debouncedSearch: null,
      tableHeaders: ["ID", " نوع الحلقه"],
    };
  },
  computed: {
    ...mapState(useTypeLessonsStore, {
      type_lessons: (state) => state.type_lessons,
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
      console.log(this.type_lessons, "Diiaaaa");
      const dataToDisplay = this.type_lessons;
      return dataToDisplay.map((les) => [les.id, les.title]);
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
      const lessonsStore = useTypeLessonsStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await lessonsStore.fetchTypeLessons(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await lessonsStore.fetchTypeLessons(1, this.word);

      if (lessonsStore.lessons.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
    },

    handlePageChange(page) {
      const lessonsStore = useTypeLessonsStore();
      lessonsStore.fetchTypeLessons(page);
    },
    async handleDeleteLessons(id) {
      const lessonsStore = useTypeLessonsStore();
      console.log(id);

      await lessonsStore.deleteTypeLessons(id);
    },
  },
  mounted() {
    const lessonsStore = useTypeLessonsStore();
    lessonsStore.fetchTypeLessons();
    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
  