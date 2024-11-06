<template>
  <header-pages title="المناهج" button="+ اضافة منهج" link="/add-curricula" />
  <div class="alll">
    <div class="curricula">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="بحث عن منهج..."
          v-model="word"
          @input="debouncedSearch"
        />
      </div>

      <tables-page-vue
        :headers="tableHeaders"
        :rows="tableRowsCurricula"
        :pages="tablePages"
        :showSelect="false"
        editLink="/edit-curricula"
        viewLink="/view-curricula"
        @delete="handleDeleteCurriculas"
      />
      <div v-if="errorMessage" class="error-message">
        <h4>{{ errorMessage }}</h4>
      </div>

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
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useCurriculaStore } from "@/stores/curricula/curriculaStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { mapState } from "pinia";
import { debounce } from "lodash"; // استيراد دالة debounce

export default {
  components: { HeaderPages, TablesPageVue, PaginationPage },
  data() {
    return {
      word: "", // الكلمة المدخلة في البحث
      debouncedSearch: null,
      errorMessage: "",
      tableHeaders: ["ID", "اسم المنهج", "نوع المنهج"],
      typeOptions: [
        { id: 1, name: "قرأن" },
        { id: 2, name: "حديث" },
        { id: 3, name: "فقه" },
      ],
    };
  },
  computed: {
    ...mapState(useCurriculaStore, {
      Curriculas: (state) => state.Curriculas,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
    }),

    tableRowsCurricula() {
      const dataToDisplay = this.Curriculas;

      return dataToDisplay.map((cur) => {
        // Find the type name based on the type ID
        const typeOption = this.typeOptions.find(
          (option) => option.id === cur.type
        );
        return [cur.id, cur.title, typeOption ? typeOption.name : ""];
      });
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
      const curriculaStore = useCurriculaStore();

      // If the search word is empty, fetch all employees
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await curriculaStore.fetchCurricula(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await curriculaStore.fetchCurricula(1, this.word);

      if (curriculaStore.Curriculas.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة"; // No results found
      } else {
        this.errorMessage = ""; // Clear error message if results found
      }
    },

    async handleDeleteCurriculas(id) {
      const curriculaStore = useCurriculaStore();
      await curriculaStore.deleteCurriculas(id);
    },
    handlePageChange(page) {
      const curriculaStore = useCurriculaStore();
      curriculaStore.fetchCurricula(page);
    },
  },
  mounted() {
    const curriculaStore = useCurriculaStore();
    curriculaStore.fetchCurricula();
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
