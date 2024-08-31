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
      tableRows: [],
      tablePages: [],
    };
  },
  mounted() {
    const employeesStore = useEmployeesStore();
    employeesStore.fetchEmployees().then(() => {
      this.tableRows = employeesStore.employees.map((emp) => [
        emp.id,
        emp.photo,
        emp.name,
        emp.email,
        emp.phone,
        emp.role,
      ]);
      this.tablePages = employeesStore.pages;
    });
  },
};
</script>

<style scoped>
.employees {
  padding: 1rem;
}
</style>
