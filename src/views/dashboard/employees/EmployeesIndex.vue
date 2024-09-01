<template>
  <div class="employees">
    <HeadersPages title="الموظفين" button="+ اضافة موظف" link="/add-employee" />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      :showSelect="true"
      editLink="/edit-employee"
      viewLink="/view-employee"
    />
  </div>
</template>

<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useEmployeesStore } from "@/stores/employees/EmployeesStore";
import { mapState } from "pinia";

export default {
  name: "EmployeesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
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
      pages: (state) => state.pages,
    }),
    tableRows() {
      return this.employees.map((emp) => [
        emp.id,
        emp.photo,
        emp.name,
        emp.email,
        emp.phone,
        emp.role,
      ]);
    },
    tablePages() {
      return this.pages;
    },
  },
  async mounted() {
    const employeesStore = useEmployeesStore();
    await employeesStore.fetchEmployees();
  },
};
</script>
