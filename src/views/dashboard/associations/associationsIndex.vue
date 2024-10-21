<template>
  <div class="Associations">
    <header-pages
      title="الجمعيات"
      button="اضافة جمعية"
      link="/add-associations"
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
      :rows="tableRowsorganizations"
      :pages="tablePages"
      :showSelect="false"
      @delete="handleDeleteDisabilitie"
      editLink="/edit-associations"
      viewLink="/view-associations"
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
import { mapState } from "pinia";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { useOrganizationsStore } from "@/stores/organizations/organizationsStore";
import { debounce } from "lodash"; // استيراد دالة debounce

export default {
  components: { HeaderPages, TablesPageVue, PaginationPage },
  data() {
    return {
      word: "", // الكلمة المدخلة في البحث
      debouncedSearch: null,
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
    handleSearch() {
      const organizationsStore = useOrganizationsStore();
      organizationsStore.fetchOrganizations(1, this.word);
    },
    handlePageChange(page) {
      const organizationsStore = useOrganizationsStore();
      organizationsStore.fetchOrganizations(page);
    },
    async handleDeleteDisabilitie(id) {
      const organizationsStore = useOrganizationsStore();
      // console.log(id);

      await organizationsStore.deleteOrganization(id);
    },
  },
  mounted() {
    const organizationsStore = useOrganizationsStore();
    organizationsStore.fetchOrganizations();
    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
