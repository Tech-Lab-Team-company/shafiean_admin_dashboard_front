<template>
  <div class="disabilities">
    <HeadersPages
      title="الأعاقات"
      button="+ اضافة اقاعة"
      link="/add-disabilities"
    />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsDisabilitie"
      :pages="tablePages"
      :showSelect="false"
      :editLink="editLink"
      :viewLink="viewLink"
      @delete="handleDeleteDisabilitie"
    />
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
export default {
  name: "DisabilitiesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
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

      return this.disabilitie.map((dis) => [
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
  },
};
</script>
