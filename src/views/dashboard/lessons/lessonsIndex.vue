<template>
  <div class="lessons">
    <header-pages
      title="الحصص"
      button="+ اضافة 
    حصه"
      link="/add-lessons"
    />
    <div class="search">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="بحث عن موظف..."
        v-model="word"
        @input="debouncedSearch"
      />
    </div>
    <tables-page-vue
      :headers="tableHeaders"
      :rows="tableRowsLessons"
      :pages="tablePages"
      :showSelect="false"
      editLink="/edit-lessons"
      viewLink="/view-lessons"
      @delete="handleDeleteLessons"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

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
      tableHeaders: ["ID", " وصف المنهج", " المرحله", "قران"],
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
      const dataToDisplay = this.lessons;
      return dataToDisplay.map((les) => [
        les.id,
        les.title,
        les.stage?.title || "",
        les.quraan?.title || "",
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
      const lessonsStore = useLessonsStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await lessonsStore.fetchLessons(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await lessonsStore.fetchLessons(1, this.word);

      if (lessonsStore.lessons.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
    },

    handlePageChange(page) {
      const lessonsStore = useLessonsStore();
      lessonsStore.fetchLessons(page);
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
    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
<style scoped>
.error-message {
  color: white;
  background-color: #ef0000a3;
  margin-top: -39px;
  margin-right: 23px;
  width: 97.4%;
  margin-bottom: -25px;
  padding: 8px;
  text-align: center;
  border-radius: 3px;
}
</style>
