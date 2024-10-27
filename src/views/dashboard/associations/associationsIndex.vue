<template>
  <div class="Associations">
    <header-pages
      title="الجمعيات"
      button="اضافة جمعية"
      link="/add-associations"
    />
    <div class="alll">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="بحث عن جمعيه..."
          v-model="word"
          @input="handleInputChange"
        />
      </div>

      <TablesPageVue
        :headers="tableHeaders"
        :rows="tableRowsorganizations"
        :pages="tablePages"
        :showSelect="false"
        @delete="handleDeleteDisabilitie"
        editLink="/edit-associations"
        viewLink="/view-associations"
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
import { mapState } from "pinia";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useOrganizationsStore } from "@/stores/organizations/organizationsStore";
import { debounce } from "lodash";

export default {
  components: { HeaderPages, TablesPageVue, PaginationPage },
  data() {
    return {
      word: "",
      debouncedSearch: null,
      errorMessage: "",
      tableHeaders: [
        "ID",
        "صوره",
        "أسم المدير",
        "أسم الجمعيه",
        "عنوان الجمعيه",
        "البريد الألكتروني المدير",
        "رقم الهاتف",
      ],
    };
  },
  computed: {
    ...mapState(useOrganizationsStore, {
      organizations: (state) => state.organizations,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
    }),
    tableRowsorganizations() {
      const dataToDisplay = this.organizations;
      return dataToDisplay.map((org) => [
        org.id,
        org.image,
        org.manager_name,
        org.name,
        org.address,
        org.manager_email,
        org.phone,
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
      const organizationsStore = useOrganizationsStore();
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await organizationsStore.fetchOrganizations(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await organizationsStore.fetchOrganizations(1, this.word);

      if (organizationsStore.organizations.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة";
      } else {
        this.errorMessage = "";
      }
    },

    handlePageChange(page) {
      const organizationsStore = useOrganizationsStore();
      organizationsStore.fetchOrganizations(page);
    },
    async handleDeleteDisabilitie(id) {
      const organizationsStore = useOrganizationsStore();
      await organizationsStore.deleteOrganization(id);
    },
  },
  mounted() {
    const organizationsStore = useOrganizationsStore();
    organizationsStore.fetchOrganizations();
    this.debouncedSearch = debounce(() => {
      this.handleSearch();
    }, 700);
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
