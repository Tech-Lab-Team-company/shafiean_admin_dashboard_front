<template>
  <div class="classes">
    <header-pages
      title=" الفصول الدراسية"
      button="+ اضافة فصل دراسي"
      link="/add-classes"
    />

    <div class="alll">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="بحث عن فصل دراسي..."
          v-model="word"
          @input="debouncedSearch"
        />
      </div>

      <TablesPageVue
        :headers="tableHeaders"
        :rows="tableRowsClasses"
        :pages="tablePages"
        editLink="/edit-classes"
        viewLink="/view-classes"
        @delete="handleDeleteClasses"
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
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useClassesStore } from "@/stores/Classess/ClassesStore";
import { mapState } from "pinia";
import { debounce } from "lodash"; // استيراد دالة debounce

export default {
  components: {
    HeaderPages,
    TablesPageVue,
    PaginationPage,
  },

  data() {
    return {
      word: "", // الكلمة المدخلة في البحث
      debouncedSearch: null,
      errorMessage: "",
      tableHeaders: ["ID", "اسم الفصول الدراسية", "الدوله"],
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
      const dataToDisplay = this.Classes;
      return dataToDisplay.map((cl) => [cl.id, cl.title, cl.country.title]);
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
      const ClassesStore = useClassesStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await ClassesStore.getClasses(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await ClassesStore.getClasses(1, this.word);

      if (ClassesStore.Classes.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
    },

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
