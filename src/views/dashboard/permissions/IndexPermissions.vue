<template>
  <div class="courses">
    <header-pages
      title="الصلاحيات"
      button="اضافة صلاحية"
      link="/add-permission"
    />
    <div class="alll">
      <tables-page-vue
        :headers="tableHeaders"
        :rows="tableRows"
        :pages="tablePages"
        :showSelect="false"
        :editLink="editLink"
        :viewLink="viewLink"
        @delete="handleDeletePermission"
      />
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
// import { mapState } from "pinia";
// import PaginationPage from "@/components/pagination/PaginationPage.vue";
// import { usePaginationStore } from "@/stores/pagination/PaginationStore";
export default {
  components: {
    HeaderPages,
    TablesPageVue,
    // PaginationPage
  },
  data() {
    return {
      tableHeaders: ["ID", "	نوع الوظيفه	", "	الصلاحيه", "	الأدوار"],
      editLink: " /edit-permissions",
      viewLink: "view-permissions",
    };
  },

  //     computed:{
  //         ...mapState(usePaginationStore, {
  //       paginationCurrent: (state) => state.current_page,
  //       paginationFrom: (state) => state.from,
  //       paginationLast: (state) => state.last_page,
  //       paginationPer: (state) => state.per_page,
  //       paginationTo: (state) => state.to,
  //       paginationTotal: (state) => state.total,
  //     }),
  //     tableRows() {
  //       return this.permissions.map((per) => [
  //         // per.id,
  //         // per.,
  //         // per.,
  //         // per.,

  //       ]);
  //     },
  //     tablePages() {
  //       return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
  //     },
  // }
};
</script>

<style></style>
