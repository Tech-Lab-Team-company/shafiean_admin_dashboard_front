<template>
  <div class="disabilities">
    <HeadersPages
      title="الأعاقات"
      button="+ اضافة اعاقه "
      link="/add-disabilities"
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
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsDisabilitie"
      :pages="tablePages"
      :showSelect="false"
      :editLink="editLink"
      :viewLink="viewLink"
      @delete="handleDeleteDisabilitie"
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
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useDisabilitieStore } from "@/stores/disabilities/disabilitieStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { mapState } from "pinia";
import { debounce } from "lodash"; // استيراد دالة debounce
export default {
  name: "DisabilitiesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
      word: "", // الكلمة المدخلة في البحث
      debouncedSearch: null,
      errorMessage: "",
      tableHeaders: ["ID", "الصور", "اسم الأعاقه", "وصف الأعاقه"],
      editLink: "/edit-disabilities",
      viewLink: "/view-disabilities",
    };
  },

  computed: {
    ...mapState(useDisabilitieStore, {
      disabilitie: (state) => state.disabilitie,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
    }),
    tableRowsDisabilitie() {
      console.log(this.disabilitie, "nasrasssssssddddddss");
      const dataToDisplay = this.disabilitie;
      return dataToDisplay.map((dis) => [
        dis.id,
        dis.image,
        dis.title,
        dis.description,
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
      const useDisabilitie = useDisabilitieStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await useDisabilitie.fetchDisabilitie(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await useDisabilitie.fetchDisabilitie(1, this.word);

      if (useDisabilitie.disabilitie.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
    },

    handlePageChange(page) {
      const useDisabilitie = useDisabilitieStore();
      useDisabilitie.fetchDisabilitie(page);
    },
    async handleDeleteDisabilitie(id) {
      const disabilitieStore = useDisabilitieStore();
      console.log(id);

      await disabilitieStore.deleteDisabilitie(id);
    },
  },

  async mounted() {
    const disabilitiesStore = useDisabilitieStore();
    await disabilitiesStore.fetchDisabilitie();

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
