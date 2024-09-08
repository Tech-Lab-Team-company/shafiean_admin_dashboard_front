<template>
  <div class="Associations">
    <header-pages
      title="الجمعيات"
      button="اضافة جمعية"
      link="/add-associations"
    />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsorganizations"
      :pages="tablePages"
      editLink="/edit-associations"
      viewLink="/view-associations"
    />
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { mapState } from "pinia";
// import { usePaginationStore } from "@/stores/pagination";
import { useOrganizationsStore } from "@/stores/organizations/organizationsStore";
export default {
  components: { HeaderPages, TablesPageVue },
  data() {
    return {
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
    }),
    tableRowsorganizations() {
      return this.organizations.map((org) => [
        org.id,
        org.image,
        org.manager_name,
        org.name,
        org.address,
        org.manager_email,
        org.phone,
      ]);
    },
  },
  mounted() {
    const organizationsStore = useOrganizationsStore();
    organizationsStore.fetchOrganizations();
  },
};
</script>
