<template>
  <div class="employees">
    <HeadersPages title="الموظفين" button="+ اضافة موظف" link="/add-employee" />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      :showSelect="false"
      :editLink="editLink"
      :viewLink="viewLink"
      @delete="handleDeleteEmployee"
      :ismaster="ismaster"
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
import { useEmployeesStore } from "@/stores/employees/EmployeesStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { mapState } from "pinia";

export default {
  name: "EmployeesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
      tableHeaders: [
        "ID",
        "الصور",
        "اسم الموظف",
        "البريد الالكتروني",
        "رقم الهاتف",
        "الصلاحيات",
      ],
      editLink: "/edit-employee",
      viewLink: "/view-employee",
    };
  },
  computed: {
    ...mapState(useEmployeesStore, {
      employees: (state) => state.employees,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
      ismaster: (state) => state.ismaster,
    }),
    tableRows() {
      console.log(this.employees, "ssss");
      return this.employees.map((emp) => [
        emp.id,
        emp.image,
        emp.name,
        emp.email,
        emp.phone,
        emp.role,
      ]);
    },
    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    handlePageChange(page) {
      const curriculaStore = useEmployeesStore();
      curriculaStore.fetchEmployees(page);
    },
    async handleDeleteEmployee(id) {
      const employeesStore = useEmployeesStore();
      console.log(id);

      await employeesStore.deleteEmployee(id);
    },
  },

  async mounted() {
    const employeesStore = useEmployeesStore();
    await employeesStore.fetchEmployees();
  },
};
</script>
